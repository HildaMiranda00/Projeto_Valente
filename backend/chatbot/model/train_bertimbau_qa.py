from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForQuestionAnswering, TrainingArguments, Trainer, DefaultDataCollator
import os

output_dir = "C:/Users/Hilda/Desktop/Projeto_Valente/backend/chatbot/model"
if __name__ == "__main__":
    try:
        squad = load_dataset("squad", split="train[:5000]").train_test_split(test_size=0.2)
    except Exception as e:
        raise ValueError(f"Erro ao carregar o dataset: {e}")

    model_name = "neuralmind/bert-base-portuguese-cased"
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    def preprocess_function(examples):
        inputs = tokenizer(
            examples["question"], examples["context"],
            max_length=384, truncation="only_second", padding="max_length", return_offsets_mapping=True
        )
        offset_mapping = inputs.pop("offset_mapping")
        answers = examples["answers"]
        start_positions, end_positions = [], []

        for i, offset in enumerate(offset_mapping):
            start_char = answers[i]["answer_start"][0]
            end_char = start_char + len(answers[i]["text"][0])
            sequence_ids = inputs.sequence_ids(i)
            context_start = sequence_ids.index(1)
            context_end = len(sequence_ids) - sequence_ids[::-1].index(1)

            if offset[context_start][0] > end_char or offset[context_end - 1][1] < start_char:
                start_positions.append(0)
                end_positions.append(0)
            else:
                start_positions.append(next(idx for idx in range(context_start, context_end) if offset[idx][0] >= start_char))
                end_positions.append(next(idx for idx in range(context_start, context_end) if offset[idx][1] <= end_char))

        inputs["start_positions"] = start_positions
        inputs["end_positions"] = end_positions
        return inputs

    try:
        tokenized_squad = squad.map(preprocess_function, batched=True, remove_columns=squad["train"].column_names)
    except Exception as e:
        raise ValueError(f"Erro ao pré-processar o dataset: {e}")

    data_collator = DefaultDataCollator()

    model = AutoModelForQuestionAnswering.from_pretrained(model_name)
    training_args = TrainingArguments(
        output_dir=output_dir,
        evaluation_strategy="epoch",
        learning_rate=2e-5,
        per_device_train_batch_size=16,
        num_train_epochs=3,
        weight_decay=0.01,
        save_strategy="epoch",
        logging_dir=f"{output_dir}/logs",
        logging_steps=10
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_squad["train"],
        eval_dataset=tokenized_squad["test"],
        tokenizer=tokenizer,
        data_collator=data_collator,
    )

    try:
        trainer.train()
        model.save_pretrained(output_dir)
        tokenizer.save_pretrained(output_dir)
        print(f"Modelo treinado e salvo em {output_dir}")
    except Exception as e:
        raise ValueError(f"Erro durante o treinamento ou salvamento: {e}")



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
#from transformers import AutoTokenizer, AutoModelForQuestionAnswering
#import torch
import json
#from difflib import get_close_matches

# Carregar o modelo e tokenizer treinados
#model_path = "C:/Users/Hilda/Desktop/Projeto_Valente/backend/chatbot/model"
  # Caminho para o modelo treinado
#tokenizer = AutoTokenizer.from_pretrained(model_path)
#model = AutoModelForQuestionAnswering.from_pretrained(model_path)

# Respostas padrão para perguntas comuns
default_responses = {
    # Saudações
    "oi": "Oi, como posso ajudar?",
    "olá": "Olá, como posso ajudar?",
    "bom dia": "Bom dia! Como posso ajudar?",
    "boa tarde": "Boa tarde! Como posso ajudar?",
    "boa noite": "Boa noite! Como posso ajudar?",

    # Números de contato
    "qual o número do disque denúncia": "O número do Disque Denúncia para relatar abuso sexual em crianças e adolescentes é o Disque 100. Ele é gratuito e funciona 24 horas por dia.",
    "disque 100": "O Disque 100 é o número para denúncias de abuso sexual infantojuvenil. Ele é gratuito, anônimo e funciona 24 horas por dia, em todo o Brasil.",
    "qual o número do conselho tutelar": "O Conselho Tutelar não possui um número único. Você deve procurar o Conselho Tutelar da sua cidade. Geralmente, a prefeitura ou o site oficial da sua cidade tem essa informação.",
    "qual o número da polícia": "Para emergências, ligue para o 190. Para denúncias de abuso sexual, você também pode contatar a Delegacia de Proteção à Criança e ao Adolescente mais próxima.",

    # Como denunciar
    "como denunciar abuso sexual infantil": (
        "Você pode denunciar abuso sexual infantil das seguintes formas:\n"
        "1. Disque 100: Ligue para o número 100, que é gratuito e anônimo.\n"
        "2. Conselho Tutelar: Procure o Conselho Tutelar da sua cidade.\n"
        "3. Delegacia Especializada: Vá até uma Delegacia de Proteção à Criança e ao Adolescente.\n"
        "4. Aplicativo Proteja Brasil: Baixe o app e faça a denúncia diretamente pelo seu celular."
    ),
    "onde denunciar abuso sexual": (
        "Você pode denunciar abuso sexual infantojuvenil nos seguintes locais:\n"
        "- Disque 100: Ligue para o número 100.\n"
        "- Conselho Tutelar: Procure o Conselho Tutelar da sua região.\n"
        "- Delegacia de Proteção à Criança e ao Adolescente: Encontre a delegacia mais próxima.\n"
        "- Aplicativo Proteja Brasil: Faça a denúncia pelo aplicativo."
    ),
    "posso denunciar anonimamente": (
        "Sim, você pode denunciar anonimamente. O Disque 100 e o Aplicativo Proteja Brasil permitem denúncias anônimas. "
        "Seu sigilo será preservado."
    ),

    # Leis e direitos
    "quais são as leis que protegem crianças e adolescentes": (
        "As principais leis que protegem crianças e adolescentes no Brasil são:\n"
        "1. Estatuto da Criança e do Adolescente (ECA): Lei nº 8.069/1990, que garante direitos como proteção, saúde e educação.\n"
        "2. Lei da Escuta Protegida: Lei nº 13.431/2017, que estabelece mecanismos para ouvir crianças e adolescentes vítimas de violência.\n"
        "3. Lei Menino Bernardo: Lei nº 13.010/2014, que proíbe o uso de castigos físicos e humilhantes.\n"
        "4. Lei da Alienação Parental: Lei nº 12.318/2010, que protege crianças de manipulação psicológica."
    ),
    "o que é o estatuto da criança e do adolescente": (
        "O Estatuto da Criança e do Adolescente (ECA), Lei nº 8.069/1990, é um conjunto de normas que garantem os direitos de crianças e adolescentes no Brasil. "
        "Ele aborda temas como saúde, educação, proteção contra violência e trabalho infantil."
    ),
    "o que é a lei da escuta protegida": (
        "A Lei da Escuta Protegida, Lei nº 13.431/2017, estabelece mecanismos para ouvir crianças e adolescentes vítimas de violência. "
        "Ela garante que a escuta seja feita de forma humanizada, evitando a revitimização."
    ),

    # Órgãos e instituições
    "o que faz o conselho tutelar": (
        "O Conselho Tutelar é um órgão responsável por zelar pelos direitos das crianças e adolescentes. "
        "Ele atua em casos de violação de direitos, como abuso sexual, negligência e exploração."
    ),
    "o que é a delegacia de proteção à criança e ao adolescente": (
        "A Delegacia de Proteção à Criança e ao Adolescente é uma delegacia especializada em crimes contra crianças e adolescentes. "
        "Ela investiga casos de abuso sexual, violência física e psicológica, entre outros."
    ),
    "o que é o aplicativo proteja brasil": (
        "O Aplicativo Proteja Brasil é uma ferramenta para denunciar violações dos direitos de crianças e adolescentes. "
        "Ele permite fazer denúncias diretamente pelo celular, de forma rápida e anônima."
    ),

    # Outras informações
    "quais são os sinais de abuso sexual infantil": (
        "Alguns sinais de abuso sexual infantil incluem:\n"
        "- Comportamento sexualizado inadequado para a idade.\n"
        "- Mudanças bruscas de comportamento, como agressividade ou isolamento.\n"
        "- Problemas de saúde, como infecções urinárias ou DSTs.\n"
        "- Medo excessivo de pessoas ou lugares específicos.\n"
        "Se notar algum desses sinais, denuncie imediatamente."
    ),
    "o que fazer se suspeitar de abuso sexual": (
        "Se você suspeitar de abuso sexual infantojuvenil, siga estes passos:\n"
        "1. Mantenha a calma: Não confronte o suspeito diretamente.\n"
        "2. Proteja a criança: Afaste-a de situações de risco.\n"
        "3. Denuncie: Ligue para o Disque 100 ou procure o Conselho Tutelar.\n"
        "4. Busque ajuda profissional: Procure apoio psicológico para a criança."
    ),

    # Perguntas adicionais
    "quem pode denunciar abuso sexual": (
        "Qualquer pessoa pode denunciar abuso sexual infantojuvenil, seja um familiar, vizinho, professor ou qualquer cidadão que tenha conhecimento do caso. "
        "Não é necessário ter provas concretas para fazer a denúncia."
    ),
    "o que acontece após a denúncia": (
        "Após a denúncia, o caso é encaminhado para os órgãos competentes, como o Conselho Tutelar ou a Delegacia de Proteção à Criança e ao Adolescente. "
        "Eles irão investigar o caso e tomar as medidas necessárias para proteger a vítima."
    ),
    "como proteger uma criança de abuso sexual": (
        "Para proteger uma criança de abuso sexual, é importante:\n"
        "- Educar a criança sobre seu corpo e limites.\n"
        "- Ensinar a criança a identificar situações de risco.\n"
        "- Manter um diálogo aberto e de confiança.\n"
        "- Ficar atento a mudanças de comportamento ou sinais de alerta."
    ),
    "o que é grooming": (
        "Grooming é uma prática em que o abusador ganha a confiança da criança ou adolescente, muitas vezes através da internet, para facilitar o abuso sexual. "
        "É importante monitorar as interações online das crianças e orientá-las sobre os perigos da internet."
    ),
    "como ajudar uma criança vítima de abuso sexual": (
        "Para ajudar uma criança vítima de abuso sexual:\n"
        "- Ofereça apoio emocional e garanta que ela se sinta segura.\n"
        "- Não a culpe ou questione sua versão dos fatos.\n"
        "- Procure ajuda profissional, como psicólogos e assistentes sociais.\n"
        "- Denuncie o caso aos órgãos competentes."
    ),
    "o que é violência sexual contra crianças": (
        "A violência sexual contra crianças inclui qualquer ato sexual envolvendo uma criança, como abuso sexual, exploração sexual, pornografia infantil e assédio. "
        "É um crime grave e deve ser denunciado imediatamente."
    ),
    "quais são os efeitos do abuso sexual em crianças": (
        "Os efeitos do abuso sexual em crianças podem incluir:\n"
        "- Trauma psicológico, como depressão e ansiedade.\n"
        "- Dificuldades de relacionamento e confiança.\n"
        "- Problemas de comportamento, como agressividade ou isolamento.\n"
        "- Impactos físicos, como lesões ou doenças sexualmente transmissíveis."
    ),
    "o que é exploração sexual infantil": (
        "A exploração sexual infantil é o uso de crianças e adolescentes para fins sexuais em troca de dinheiro, presentes ou outros benefícios. "
        "É uma violação grave dos direitos humanos e um crime que deve ser denunciado."
    ),
    "como identificar um abusador": (
        "Identificar um abusador pode ser difícil, mas alguns sinais incluem:\n"
        "- Comportamento excessivamente próximo ou afetuoso com crianças.\n"
        "- Tentativas de isolar a criança de outras pessoas.\n"
        "- Oferecer presentes ou benefícios em excesso.\n"
        "- Comportamento manipulador ou controlador."
    ),
    "o que é a rede de proteção à criança e ao adolescente": (
        "A rede de proteção à criança e ao adolescente é um conjunto de órgãos e instituições que atuam para garantir os direitos e a proteção de crianças e adolescentes. "
        "Inclui Conselhos Tutelares, Delegacias Especializadas, escolas, hospitais e ONGs."
    ),
    "como falar com uma criança sobre abuso sexual": (
        "Para falar com uma criança sobre abuso sexual:\n"
        "- Use linguagem simples e adequada à idade.\n"
        "- Explique sobre partes íntimas e toques inadequados.\n"
        "- Ensine a criança a dizer 'não' e a procurar ajuda se sentir desconfortável.\n"
        "- Mantenha um diálogo aberto e de confiança."
    ),
    "o que é a campanha faça bonito": (
        "A Campanha Faça Bonito é uma iniciativa nacional de combate ao abuso e à exploração sexual de crianças e adolescentes. "
        "Ela ocorre anualmente no dia 18 de maio, com ações de conscientização e mobilização da sociedade."
    ),
    "qual a importância de denunciar abuso sexual": (
        "Denunciar abuso sexual é fundamental para:\n"
        "- Proteger a criança ou adolescente de mais violência.\n"
        "- Interromper o ciclo de abuso.\n"
        "- Responsabilizar o agressor.\n"
        "- Garantir que a vítima receba o apoio necessário."
    ),
    "o que é a escuta especializada": (
        "A escuta especializada é um procedimento previsto na Lei da Escuta Protegida, onde crianças e adolescentes vítimas de violência são ouvidos por profissionais capacitados, "
        "evitando a revitimização e garantindo um atendimento humanizado."
    ),
    "como a escola pode ajudar em casos de abuso sexual": (
        "A escola pode ajudar em casos de abuso sexual:\n"
        "- Identificando sinais de alerta.\n"
        "- Oferecendo um ambiente seguro para a criança.\n"
        "- Encaminhando o caso para o Conselho Tutelar ou outros órgãos.\n"
        "- Promovendo ações de prevenção e conscientização."
    ),
    "o que é o dia nacional de combate ao abuso sexual infantil": (
        "O Dia Nacional de Combate ao Abuso e à Exploração Sexual de Crianças e Adolescentes é celebrado em 18 de maio. "
        "A data visa conscientizar a sociedade sobre a importância de proteger crianças e adolescentes e denunciar casos de violência sexual."
    ),
    "como denunciar abuso sexual online": (
        "Para denunciar abuso sexual online:\n"
        "- Use o Disque 100 ou o Aplicativo Proteja Brasil.\n"
        "- Registre a denúncia na Delegacia de Crimes Cibernéticos.\n"
        "- Salve prints e evidências do conteúdo abusivo.\n"
        "- Denuncie também à plataforma onde o conteúdo foi encontrado."
    ),
    "o que é pornografia infantil": (
        "A pornografia infantil é qualquer material que represente crianças ou adolescentes em cenas de sexo explícito. "
        "É um crime grave e deve ser denunciado imediatamente às autoridades."
    ),
    "como prevenir o abuso sexual infantil": (
        "Para prevenir o abuso sexual infantil:\n"
        "- Eduque as crianças sobre seus direitos e limites corporais.\n"
        "- Monitore as interações online e offline.\n"
        "- Promova um ambiente de confiança e diálogo.\n"
        "- Participe de campanhas de conscientização."
    ),
    "o que é revitimização": (
        "A revitimização ocorre quando a criança ou adolescente vítima de abuso sexual é exposta a situações que reativam o trauma, como depoimentos repetitivos ou falta de acolhimento. "
        "A Lei da Escuta Protegida busca evitar esse problema."
    ),
    "como apoiar uma família que enfrenta abuso sexual": (
        "Para apoiar uma família que enfrenta abuso sexual:\n"
        "- Ofereça suporte emocional e prático.\n"
        "- Incentive a busca por ajuda profissional.\n"
        "- Ajude a denunciar o caso, se necessário.\n"
        "- Respeite o tempo e os sentimentos da família."
    ),
    "o que é abuso sexual intrafamiliar": (
        "O abuso sexual intrafamiliar ocorre quando o agressor é alguém da família da vítima, como pai, mãe, padrasto, tio ou irmão. "
        "É um dos tipos mais comuns de abuso sexual e muitas vezes é silenciado por medo ou vergonha."
    ),
    "quais são os canais de denúncia online": (
        "Os principais canais de denúncia online são:\n"
        "- Disque 100: Através do site ou aplicativo.\n"
        "- Aplicativo Proteja Brasil: Disponível para download.\n"
        "- Delegacia de Crimes Cibernéticos: Para denúncias de abuso online."
    ),
    "o que é o sistema de garantia de direitos": (
        "O Sistema de Garantia de Direitos (SGD) é um conjunto de políticas públicas e instituições que atuam para garantir os direitos de crianças e adolescentes. "
        "Inclui Conselhos Tutelares, Defensorias Públicas, Ministério Público e ONGs."
    ),
    "como identificar abuso sexual em adolescentes": (
        "Para identificar abuso sexual em adolescentes, fique atento a:\n"
        "- Mudanças bruscas de comportamento.\n"
        "- Isolamento social ou queda no rendimento escolar.\n"
        "- Comportamentos autodestrutivos ou de risco.\n"
        "- Sinais físicos, como lesões ou gravidez precoce."
    ),
    "o que é a notificação compulsória": (
        "A notificação compulsória é a obrigação legal de profissionais da saúde, educação e assistência social de comunicar casos suspeitos ou confirmados de violência contra crianças e adolescentes às autoridades competentes."
    ),
    "como denunciar abuso sexual em escolas": (
        "Para denunciar abuso sexual em escolas:\n"
        "- Comunique a direção da escola e o Conselho Tutelar.\n"
        "- Ligue para o Disque 100.\n"
        "- Registre a denúncia na Delegacia de Proteção à Criança e ao Adolescente.\n"
        "- Documente todas as informações e evidências."
    ),
    "o que é o programa de proteção a vítimas e testemunhas": (
        "O Programa de Proteção a Vítimas e Testemunhas oferece medidas de segurança e apoio a pessoas que correm risco devido a denúncias de crimes, incluindo abuso sexual. "
        "Ele garante proteção física, psicológica e jurídica."
    ),
    "como a comunidade pode combater o abuso sexual": (
        "A comunidade pode combater o abuso sexual:\n"
        "- Promovendo campanhas de conscientização.\n"
        "- Apoiando vítimas e suas famílias.\n"
        "- Denunciando casos suspeitos.\n"
        "- Participando de ações de prevenção e educação."
    ),
}

@csrf_exempt
def chat(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_message = data.get('message', '').strip().lower()

        if not user_message:
            return JsonResponse({'response': 'Por favor, insira uma mensagem válida.'})

        # Verificar se a mensagem do usuário corresponde a alguma chave no dicionário
        #matches = get_close_matches(user_message, default_responses.keys(), n=1, cutoff=0.6)
        #if matches:
        #    return JsonResponse({'response': default_responses[matches[0]]})

        # Contexto detalhado para o modelo
        context = (
            "Ajudar pessoas a denunciar abuso sexual infantil. "
            "O número do Disque Denúncia para relatar abuso sexual em crianças é o Disque 100. "
            "Este serviço é gratuito, funciona 24 horas por dia e pode ser acessado de qualquer lugar do Brasil. "
            "Além disso, você pode procurar o Conselho Tutelar mais próximo ou a Delegacia de Proteção à Criança e ao Adolescente."
        )

        try:
            # Tokenizar a entrada
            #inputs = tokenizer(
             #   user_message,
              #  context,
               # return_tensors="pt",
                #max_length=384,
               # truncation="only_second",
               # padding="max_length"
            #)

            # Gerar a resposta do modelo
            #with torch.no_grad():
                #outputs = model(**inputs)

            # Extrair a resposta
            #answer_start = torch.argmax(outputs.start_logits)
            #answer_end = torch.argmax(outputs.end_logits) + 1
            #answer_ids = inputs["input_ids"][0][answer_start:answer_end]
            #answer = tokenizer.decode(answer_ids, skip_special_tokens=True)

            # Validar a resposta
            if not answer.strip():
                answer = "Desculpe, não consegui encontrar uma resposta. Por favor, reformule sua pergunta."

            return JsonResponse({'response': answer})
        
        except Exception as e:
            print(f"Erro ao processar a mensagem: {e}")
            return JsonResponse({'response': 'Ocorreu um erro ao processar sua mensagem. Tente novamente.'}, status=500)

    return JsonResponse({'error': 'Método não permitido'}, status=405)
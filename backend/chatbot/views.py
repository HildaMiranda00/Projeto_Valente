from rest_framework.views import APIView
from rest_framework.response import Response
from transformers import pipeline
from django.http import JsonResponse

class ChatbotAPIView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        try:
            self.qa_pipeline = pipeline(
                "question-answering", 
                model="neuralmind/bert-base-portuguese-cased", 
                tokenizer="neuralmind/bert-base-portuguese-cased"
            )
        except Exception as e:
            print(f"Erro ao carregar o pipeline BERT: {e}")
            self.qa_pipeline = None

    def post(self, request):
        if not self.qa_pipeline:
            return Response({"error": "Pipeline não está carregado corretamente."}, status=500)

        question = request.data.get("question")
        context = request.data.get("context")

        if not question or not context:
            return Response({"error": "Both question and context are required."}, status=400)

        try:
            result = self.qa_pipeline(question=question, context=context)
            return Response({"answer": result.get("answer")}, status=200)
        except Exception as e:
            return Response({"error": f"Erro ao processar a solicitação: {e}"}, status=500)

# Create your views here.

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
@csrf_exempt
def create_event(request):
        data = request.data
        event = data.get('event')
        print(event)
        
        return Response({"mensagem": f"Evento recebido com sucesso!"}, status=status.HTTP_201_CREATED)
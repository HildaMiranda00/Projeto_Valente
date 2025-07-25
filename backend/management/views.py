from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
from django.contrib.auth.decorators import login_required
from .models import *
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth.models import User
import re
from django.utils import timezone


@csrf_exempt
def create_event(request):
    if request.method == 'POST':
        try:
            titulo = request.POST.get('titulo')
            descricao = request.POST.get('descricao')
            promotor = request.POST.get('promotor')
            local = request.POST.get('local')
            estado = request.POST.get('estado')
            telefone = request.POST.get('telefone')
            data_inicio = request.POST.get('data-inicio')
            horario_inicio = request.POST.get('horario-inicio')
            data_fim = request.POST.get('data-fim')
            horario_fim = request.POST.get('horario-fim')
            email = request.POST.get('email')
            link = request.POST.get('link')
            imagem = "exemplo_url_imagem" 

            # Salva no banco
            evento = Event.objects.create(
                title=titulo,
                description=descricao,
                promotes_by=promotor,
                local=local,
                state=estado,
                phone=telefone,
                start_date=data_inicio,
                time_start=horario_inicio,
                end_date=data_fim,
                time_end=horario_fim,
                email=email,
                event_link=link,
                imagem=imagem
            )

            return JsonResponse({'success': True, 'message': 'Evento cadastrado com sucesso.'}, status=201)

        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)

    return JsonResponse({'success': False, 'error': 'Método não permitido.'}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            # Se os dados forem enviados como JSON
            data = json.loads(request.body)
            cnpj = data.get('cnpj')
            password = data.get('senha')
        except:
            cnpj = request.POST.get('cnpj')
            password = request.POST.get('senha')

        user = authenticate(request, username=cnpj, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login realizado com sucesso!'})
        else:
            return JsonResponse({'error': 'CNPJ ou senha inválidos.'}, status=401)
    
    return JsonResponse({'error': 'Método não permitido.'}, status=405)

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        cnpj = request.POST.get('cnpj')
        email = request.POST.get('email')
        telefone = request.POST.get('telefone')
        senha = request.POST.get('senha')
        confirmar_senha = request.POST.get('confirmar-senha')
        aceita_termos = request.POST.get('aceita-termos')

        if not aceita_termos:
            return JsonResponse({'success': False, 'error': 'Você deve aceitar os termos de uso.'}, status=400)

        if senha != confirmar_senha:
            return JsonResponse({'success': False, 'error': 'As senhas não coincidem.'}, status=400)

        if len(senha) < 8 or not re.search(r'[A-Za-z]', senha) or not re.search(r'[0-9]', senha) or not re.search(r'[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]', senha):
            return JsonResponse({'success': False, 'error': 'A senha deve conter ao menos 8 caracteres, incluindo letras, números e símbolos.'}, status=400)

        if User.objects.filter(username=cnpj).exists():
            return JsonResponse({'success': False, 'error': 'CNPJ já cadastrado.'}, status=400)

        # Criação do usuário
        user = User.objects.create_user(
            username=cnpj,
            email=email,
            password=senha,
            first_name=nome,
        )

        login(request, user) 
        return JsonResponse({'success': True, 'message': 'Usuário registrado com sucesso.'}, status=201)

    return JsonResponse({'success': False, 'error': 'Método não permitido.'}, status=405)

def event_list(request):
    estado = request.GET.get('estado')

    eventos = Event.objects.all()

    # Filtra pelo estado, se fornecido
    if estado:
        eventos = eventos.filter(state=estado)

    eventos = eventos.filter(start_date__gte=timezone.now().date()).order_by('start_date')

    eventos_serializados = []
    for evento in eventos:
        eventos_serializados.append({
            "titulo": evento.title,
            "descricao": evento.description,
            "promotor": evento.promotes_by,
            "local": evento.local,
            "estado": evento.state,
            "dataInicio": evento.start_date.strftime('%Y-%m-%d'),
            "horarioInicio": evento.time_start.strftime('%H:%M'),
            "dataFim": evento.end_date.strftime('%Y-%m-%d'),
            "horarioFim": evento.time_end.strftime('%H:%M'),
            "telefone": evento.phone,
            "email": evento.email,
            "link": evento.event_link,
            "imagem": evento.imagem
        })

    return JsonResponse(eventos_serializados, safe=False)
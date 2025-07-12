document.getElementById('eventoForm').addEventListener('submit', function(event) { 
  event.preventDefault();
  
  // Coletando os dados do formulário
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const promotor = document.getElementById('promotor').value;
  const local = document.getElementById('local').value;
  const estado = document.getElementById('estado').value;
  const dataInicio = document.getElementById('data-inicio').value;
  const horarioInicio = document.getElementById('horario-inicio').value;
  const dataFim = document.getElementById('data-fim').value;
  const horarioFim = document.getElementById('horario-fim').value;
  
  let telefone = document.getElementById('telefone').value.replace(/\D/g, ''); // Remove caracteres não numéricos
  const email = document.getElementById('email').value;
  const link = document.getElementById('link').value;
  const imagemInput = document.getElementById('imagem');

  // Validação do telefone
  if (telefone && (telefone.length < 10 || telefone.length > 11)) {
    alert('O telefone deve ter 10 ou 11 dígitos (incluindo DDD).');
    return;
  }

  // Formatação do telefone
  if (telefone.length === 10) {
    telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6)}`;
  } else if (telefone.length === 11) {
    telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`;
  }

  // Verificação dos campos obrigatórios
  if (!titulo || !descricao || !promotor || !local || !estado || !dataInicio || !horarioInicio || !dataFim || !horarioFim || (!email && !telefone)) {
    alert('Todos os campos obrigatórios devem ser preenchidos. Preencha o telefone ou o e-mail para contato.');
    return;
  }

  // Ajusta a data para evitar problemas de fuso horário
  const dataInicioEvento = new Date(`${dataInicio}T${horarioInicio}`);
  const dataFimEvento = new Date(`${dataFim}T${horarioFim}`);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (dataInicioEvento < hoje) {
    alert('A data de início do evento não pode ser anterior à data atual.');
    return;
  }

  if (dataFimEvento < dataInicioEvento) {
    alert('A data de fim do evento não pode ser anterior à data de início.');
    return;
  }

  // Função para converter imagem em Base64
  function converterParaBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  if (imagemInput.files.length > 0) {
    converterParaBase64(imagemInput.files[0]).then(imagemBase64 => {
      salvarEvento(imagemBase64);
    }).catch(error => {
      console.error('Erro ao processar a imagem:', error);
      salvarEvento('');
    });
  } else {
    salvarEvento('');
  }

  function salvarEvento(imagemBase64) {
    // Criando o objeto do evento
    const evento = {
      titulo,
      descricao,
      promotor,
      local,
      estado,
      dataInicio,
      horarioInicio,
      dataFim,
      horarioFim,
      telefone,
      email,
      link,
      //imagem: imagemBase64 // Agora a imagem é armazenada em Base64
    };
//https://backend-cool-forest-8585.fly.dev/management/create_event/
fetch("https://10.0.2.2:8000/management/create_event/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    event: evento,
  })
})
.then(response => response.json())
.then(data => console.log(data));

    // Recuperando os eventos do localStorage e adicionando o novo evento
    //let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    //eventos.push(evento);

    // Atualizando o localStorage com a lista de eventos
    //localStorage.setItem('eventos', JSON.stringify(eventos));

    // Mensagem de sucesso e redirecionamento
    alert('Evento cadastrado com sucesso!');
    window.location.href = 'eventos.html';
  }
});

document.getElementById('eventoForm').addEventListener('submit', function(event) { 
  event.preventDefault();
  
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const promotor = document.getElementById('promotor').value;
  const local = document.getElementById('local').value;
  const estado = document.getElementById('estado').value;
  const data = document.getElementById('data').value; // Mantém formato ISO
  const horario = document.getElementById('horario').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  const link = document.getElementById('link').value;

  if (!titulo || !descricao || !promotor || !local || !estado || !data || !horario || (!email && !telefone)) {
    alert('Todos os campos obrigatórios devem ser preenchidos. Preencha o telefone ou o e-mail.');
    return;
  }

  // Ajusta a data para evitar problemas de fuso horário
  const dataEvento = new Date(data + 'T00:00:00');
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (dataEvento < hoje) {
    alert('A data do evento não pode ser anterior à data atual.');
    return;
  }

  const evento = {
    titulo,
    descricao,
    promotor,
    local,
    estado,
    data: dataEvento.toISOString().split('T')[0], // Garante armazenamento correto
    horario,
    telefone,
    email,
    link
  };

  let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
  eventos.push(evento);
  localStorage.setItem('eventos', JSON.stringify(eventos));

  alert('Evento cadastrado com sucesso!');
  window.location.href = 'eventos.html';
});


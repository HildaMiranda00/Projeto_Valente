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

  if (!titulo || !descricao || !promotor || !local || !estado || !data || !horario || !telefone || !email || !link) {
    alert('Todos os campos são obrigatórios.');
    return;
  }

  // Verifica se a data do evento já passou
  const dataEvento = new Date(data);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // Remove a parte da hora para comparação apenas de datas

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
    data, // Mantém formato ISO (yyyy-mm-dd)
    horario,
    telefone,
    email,
    link
  };

  // Recupera eventos salvos ou cria um array vazio
  let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
  
  // Adiciona o novo evento ao array
  eventos.push(evento);

  // Salva novamente no localStorage
  localStorage.setItem('eventos', JSON.stringify(eventos));

  alert('Evento cadastrado com sucesso!');
  window.location.href = 'eventos.html'; // Redireciona para a página de exibição
});


document.getElementById('eventoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const local = document.getElementById('local').value;
  const estado = document.getElementById('estado').value;
  const data = document.getElementById('data').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  const link = document.getElementById('link').value;
  const horario = document.getElementById('horario').value;
  const promotor = document.getElementById('promotor').value;
  
  if (!titulo || !descricao || !local || !estado || !data || !telefone || !email || !link || !horario || !promotor) {
    alert('Todos os campos são obrigatórios.');
    return;
  }

  // Converte a data do formato ISO (yyyy-mm-dd) para o formato brasileiro (dd/mm/yyyy)
  const dataFormatada = new Date(data).toLocaleDateString('pt-BR');

  const evento = {
    titulo,
    descricao,
    local,
    estado,
    data: dataFormatada,
    telefone,
    email,
    link,
    horario,
    promotor
  };

  // Recupera eventos salvos ou cria um array vazio
  let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
  
  // Adiciona o novo evento ao array
  eventos.push(evento);

  // Salva novamente no localStorage
  localStorage.setItem('eventos', JSON.stringify(eventos));

  alert('Evento cadastrado com sucesso!');
  window.location.href = 'eventos.html'; // Redireciona para a página de eventos (agora eventos.html)
});

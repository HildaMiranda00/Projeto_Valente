document.addEventListener('DOMContentLoaded', function() {
  // Recupera os eventos armazenados no localStorage
  const eventos = JSON.parse(localStorage.getItem('eventos')) || [];

  // Filtra eventos com base no estado e na data atual
  function filtrarEventos() {
    const estadoFiltro = document.getElementById('filtroEstado').value;
    const dataAtual = new Date();

    const eventosFiltrados = eventos.filter(evento => {
      // Converte a data armazenada (formato brasileiro) para formato Date
      const dataEvento = new Date(evento.data.split('/').reverse().join('-'));
      return (!estadoFiltro || evento.estado === estadoFiltro) && dataEvento >= dataAtual;
    });

    exibirEventos(eventosFiltrados);
  }

  // Exibe eventos na tela
  function exibirEventos(eventos) {
    const eventosList = document.getElementById('eventosList');
    eventosList.innerHTML = '';

    if (eventos.length === 0) {
      eventosList.innerHTML = '<div id="nenhumEvento"><p><strong>Nenhum evento encontrado. Tente aplicar outro filtro.</strong></p></div>';
      return;
    }

    // Exibe os eventos filtrados
    eventos.forEach(evento => {
      const divEvento = document.createElement('div');
      divEvento.classList.add('evento');
      divEvento.innerHTML = `
        <h3>${evento.titulo}</h3>
        <p>${evento.descricao}</p>
        <p><strong>Local:</strong> ${evento.local}</p>
        <p><strong>Estado:</strong> ${evento.estado}</p>
        <p><strong>Data:</strong> ${evento.data}</p> <!-- Data já no formato brasileiro -->
      `;
      eventosList.appendChild(divEvento);
    });
  }

  // Adiciona evento para filtrar ao selecionar estado
  document.getElementById('filtroEstado').addEventListener('change', filtrarEventos);

  // Exibe todos os eventos inicialmente
  filtrarEventos();

  // Atualiza o link de redirecionamento para a página de cadastro
  document.querySelector('.cadastro-container button').onclick = function() {
    window.location.href = 'eventos-cadastro.html';
  };
});




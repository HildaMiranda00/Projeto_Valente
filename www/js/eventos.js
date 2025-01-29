document.addEventListener('DOMContentLoaded', function () {
  // Recupera os eventos armazenados no localStorage
  const eventos = JSON.parse(localStorage.getItem('eventos')) || [];

  // Filtra eventos com base no estado e na data atual
  function filtrarEventos() {
    const estadoFiltro = document.getElementById('filtroEstado').value;
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0); // Remove a parte da hora para comparação

    const eventosFiltrados = eventos.filter(evento => {
      // Converte a data armazenada (formato ISO) para objeto Date
      const dataEvento = new Date(evento.data);
      return (!estadoFiltro || evento.estado === estadoFiltro) && dataEvento >= dataAtual;
    });

    exibirEventos(eventosFiltrados);
  }

  // Exibe eventos na tela
  function exibirEventos(eventos) {
    const eventosList = document.getElementById('eventosList');
    eventosList.innerHTML = '';

    if (eventos.length === 0) {
      eventosList.innerHTML = '<div id="nenhumEvento"><p><strong>Nenhum evento encontrado.<br>Tente aplicar outro filtro.</strong></p></div>';
      return;
    }

    eventos.forEach(evento => {
      const divEvento = document.createElement('div');
      divEvento.classList.add('evento');

      // Usa uma imagem padrão se nenhuma imagem for fornecida
      const imagemEvento = evento.imagem || 'img/tela_eventos_imagem_perfil.png';

      // Converte a data para formato brasileiro ao exibir
      const dataEvento = new Date(evento.data);
      const dataFormatada = dataEvento.toLocaleDateString('pt-BR');

      divEvento.innerHTML = `
        <img src="${imagemEvento}" alt="Imagem do evento" id="imgEvento" class="card-image">
        <h3>${evento.titulo}</h3>
        <p>${evento.descricao}</p>
        <p><strong>Promovido por:</strong> ${evento.promotor}</p>
        <p><strong>Local:</strong> ${evento.local}</p>
        <p><strong>Estado:</strong> ${evento.estado}</p>
        <p><strong>Data:</strong> ${dataFormatada}</p>
        <p><strong>Horário:</strong> ${evento.horario}</p>
        <p><strong>Telefone:</strong> ${evento.telefone}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${evento.email}">${evento.email}</a></p>
        <p><strong>Link:</strong> <a href="${evento.link}" target="_blank">${evento.link}</a></p>
      `;

      eventosList.appendChild(divEvento);
    });
  }

  // Adiciona evento para filtrar ao selecionar estado
  document.getElementById('filtroEstado').addEventListener('change', filtrarEventos);

  // Exibe todos os eventos inicialmente
  filtrarEventos();

  // Atualiza o link de redirecionamento para a página de cadastro
  document.querySelector('.cadastro-container button').onclick = function () {
    window.location.href = 'eventos-cadastro.html';
  };
});


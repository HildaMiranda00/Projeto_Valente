document.addEventListener('DOMContentLoaded', function () {
  const filtroSelect = document.getElementById('filtroEstado');
  const eventosList = document.getElementById('eventosList');

  async function buscarEventos() {
    const estadoFiltro = filtroSelect.value;
    const url = estadoFiltro
      ? `https://backend-cool-forest-8585.fly.dev/management/event_list/?estado=${estadoFiltro}`
      : `https://backend-cool-forest-8585.fly.dev/management/event_list/`;

    try {
      const response = await fetch(url);
      const eventos = await response.json();
      exibirEventos(eventos);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      eventosList.innerHTML = '<p>Erro ao carregar eventos.</p>';
    }
  }

  function exibirEventos(eventos) {
    eventosList.innerHTML = '';

    if (eventos.length === 0) {
      eventosList.innerHTML = '<div id="nenhumEvento"><p><strong>Nenhum evento encontrado.<br>Tente aplicar outro filtro.</strong></p></div>';
      return;
    }

    eventos.forEach(evento => {
      const divEvento = document.createElement('div');
      divEvento.classList.add('evento');

      const imagemEvento = evento.imagem || 'img/tela_eventos_imagem_perfil.png';
      const dataInicioFormatada = evento.dataInicio.split('-').reverse().join('/');
      const dataFimFormatada = evento.dataFim.split('-').reverse().join('/');

      divEvento.innerHTML = `
        <img src="${imagemEvento}" alt="Imagem do evento" class="card-image">
        <h3>${evento.titulo}</h3>
        <p>${evento.descricao}</p>
        <p><strong>Promovido por:</strong> ${evento.promotor}</p>
        <p><strong>Local:</strong> ${evento.local}</p>
        <p><strong>Estado:</strong> ${evento.estado}</p>
        <p><strong>Data de Início:</strong> ${dataInicioFormatada} às ${evento.horarioInicio}</p>
        <p><strong>Data de Fim:</strong> ${dataFimFormatada} às ${evento.horarioFim}</p>
        <p><strong>Telefone:</strong> ${evento.telefone}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${evento.email}">${evento.email}</a></p>
        <p><strong>Link:</strong> <a href="${evento.link}" target="_blank">${evento.link}</a></p>
      `;

      eventosList.appendChild(divEvento);
    });
  }

  filtroSelect.addEventListener('change', buscarEventos);
  buscarEventos();
});

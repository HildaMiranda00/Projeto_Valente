document.addEventListener('DOMContentLoaded', function () {
  const eventos = JSON.parse(localStorage.getItem('eventos')) || [];

  function filtrarEventos() {
    const estadoFiltro = document.getElementById('filtroEstado').value;
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    const eventosFiltrados = eventos.filter(evento => {
      const dataInicioEvento = new Date(`${evento.dataInicio}T${evento.horarioInicio}`);
      return (!estadoFiltro || evento.estado === estadoFiltro) && dataInicioEvento >= dataAtual;
    });

    eventosFiltrados.sort((a, b) => {
      const dataA = new Date(`${a.dataInicio}T${a.horarioInicio}`);
      const dataB = new Date(`${b.dataInicio}T${b.horarioInicio}`);
      return dataA - dataB;
    });

    exibirEventos(eventosFiltrados);
  }

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

      const imagemEvento = evento.imagem ? evento.imagem : 'img/tela_eventos_imagem_perfil.png';

      // Formatação das datas
      const dataInicioFormatada = evento.dataInicio.split('-').reverse().join('/');
      const dataFimFormatada = evento.dataFim.split('-').reverse().join('/');

      divEvento.innerHTML = `
        <img src="${imagemEvento}" alt="Imagem do evento" id="imgEvento" class="card-image">
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

  document.getElementById('filtroEstado').addEventListener('change', filtrarEventos);
  filtrarEventos();

  document.querySelector('.cadastro-container button').onclick = function () {
    window.location.href = 'eventos-cadastro.html';
  };
});

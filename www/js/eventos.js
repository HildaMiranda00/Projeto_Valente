document.addEventListener('DOMContentLoaded', function () {
  const eventos = JSON.parse(localStorage.getItem('eventos')) || [];

  function filtrarEventos() {
    const estadoFiltro = document.getElementById('filtroEstado').value;
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
  
    const eventosFiltrados = eventos.filter(evento => {
      const partesData = evento.data.split('-');
      const dataEvento = new Date();
      dataEvento.setFullYear(parseInt(partesData[0]), parseInt(partesData[1]) - 1, parseInt(partesData[2]));
      dataEvento.setHours(0, 0, 0, 0);
      return (!estadoFiltro || evento.estado === estadoFiltro) && dataEvento >= dataAtual;
    });
  
    eventosFiltrados.sort((a, b) => {
      const dataA = new Date();
      const partesA = a.data.split('-');
      dataA.setFullYear(parseInt(partesA[0]), parseInt(partesA[1]) - 1, parseInt(partesA[2]));
      dataA.setHours(0, 0, 0, 0);
      
      const dataB = new Date();
      const partesB = b.data.split('-');
      dataB.setFullYear(parseInt(partesB[0]), parseInt(partesB[1]) - 1, parseInt(partesB[2]));
      dataB.setHours(0, 0, 0, 0);
      
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
      
      // Agora a imagem é um Base64 válido, então usamos diretamente no src
      const imagemEvento = evento.imagem ? evento.imagem : 'img/tela_eventos_imagem_perfil.png';

      const partesData = evento.data.split('-');
      const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

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

  document.getElementById('filtroEstado').addEventListener('change', filtrarEventos);
  filtrarEventos();

  document.querySelector('.cadastro-container button').onclick = function () {
    window.location.href = 'eventos-cadastro.html';
  };
});

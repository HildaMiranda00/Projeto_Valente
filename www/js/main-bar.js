
document.addEventListener('DOMContentLoaded', function () {
    // HTML da barra principal
    const mainBarHTML = `
       <div class="main-bar" id="main-bar">
            <a href="disque.html" class="link" data-page="disque">
                <span class="icon">
                    <img src="img/footer_disque.svg" alt="Ícone de alerta" class="svg-icon">
                </span>
            </a>
            <a href="leis.html" class="link" data-page="leis">
                <span class="icon">
                    <img src="img/footer_leis.svg" alt="Ícone de leis" class="svg-icon">
                </span>
            </a>
            <a href="home.html" class="link" data-page="home">
                <span class="icon">
                    <img src="img/footer_home.svg" alt="Ícone de alerta" class="svg-icon">
                </span>
            </a>
            <a href="eventos.html" class="link" data-page="eventos">
                <span class="icon">
                    <img src="img/footer_eventos.svg" alt="Ícone de eventos" class="svg-icon">
                </span>
            </a>
            <a href="social.html" class="link" data-page="social">
                <span class="icon">
                    <img src="img/footer_social.svg" alt="Ícone de social" class="svg-icon">
                </span>
            </a>

            <a href="chatbot.html" class="link" data-page="chatbot">
                <span class="icon">
                    <img src="img/footer_bot.svg" alt="Ícone de chatbot" class="svg-icon">
                </span>
            </a>

       </div>
    `;

    // Insere o main-bar no final do body
    document.body.insertAdjacentHTML('beforeend', mainBarHTML);

    // Identifica a página atual pelo pathname
    const currentPath = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('#main-bar .link');

    links.forEach(link => {
        const page = link.getAttribute('data-page');
        const img = link.querySelector('img');
        if (currentPath === `${page}.html`) {
            // Adiciona a classe ao ícone ativo
            img.classList.add('active-icon');
        } else {
            // Garante que os ícones não ativos não tenham a classe
            img.classList.remove('active-icon');
        }
    });
});



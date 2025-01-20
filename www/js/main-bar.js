document.addEventListener('DOMContentLoaded', function () {
    // Código existente da barra principal
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

    document.body.insertAdjacentHTML('beforeend', mainBarHTML);

    const mainBar = document.getElementById('main-bar');
    const initialHeight = mainBar.offsetHeight; // Altura inicial da barra

    // Detecta mudança de tamanho na janela para ajustar a barra
    window.addEventListener('resize', () => {
        const viewportHeight = window.innerHeight;

        // Verifica se o teclado virtual está ativo
        if (viewportHeight < window.screen.height * 0.85) {
            // Aumenta a altura da barra
            mainBar.style.height = '12vh';
        } else {
            // Restaura a altura original
            mainBar.style.height = `${initialHeight}px`;
        }
    });
});



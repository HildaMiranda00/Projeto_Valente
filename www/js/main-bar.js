document.addEventListener('DOMContentLoaded', function () {
    // Código existente da barra principal
    const mainBarHTML = `
       <div class="main-bar" id="main-bar">

            <a href="home.html" class="link" data-page="home">
                <span class="icon">
                    <img src="img/footer_home.svg" alt="Ícone home" class="svg-icon">
                </span>
            </a>

            <a href="eventos.html" class="link" data-page="eventos">
                <span class="icon">
                    <img src="img/footer_eventos.svg" alt="Ícone eventos" class="svg-icon">
                </span>
            </a>

            <a href="social.html" class="link" data-page="social">
                <span class="icon">
                    <img src="img/footer_social.svg" alt="Ícone comunidade" class="svg-icon">
                </span>
            </a>

             <a href="disque.html" class="link" data-page="disque">
                <span class="icon">
                    <img src="img/footer_disque.svg" alt="Ícone denuncie" class="svg-icon">
                </span>
            </a>

            <a href="leis.html" class="link" data-page="leis">
                <span class="icon">
                    <img src="img/footer_leis.svg" alt="Ícone leis" class="svg-icon">
                </span>
            </a>

            <a href="chatbot.html" class="link" data-page="chatbot">
                <span class="icon">
                    <img src="img/footer_bot.svg" alt="Ícone chatbot" class="svg-icon">
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

    // Lógica para destacar o ícone da página atual
    const currentPath = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('#main-bar .link');

    links.forEach(link => {
        const page = link.getAttribute('data-page');
        const img = link.querySelector('img');
        if (currentPath === `${page}.html`) {
            img.classList.add('active-icon'); // Destaca o ícone da página atual
        } else {
            img.classList.remove('active-icon');
        }

        // Adicionando evento de clique para mudar a cor do ícone
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Previne o comportamento padrão de navegação

            // Remove a classe 'active-icon' de todos os ícones
            links.forEach(item => {
                const iconImg = item.querySelector('.svg-icon');
                iconImg.classList.remove('active-icon');
            });

            // Adiciona a classe 'active-icon' no ícone do link clicado
            const iconImg = link.querySelector('.svg-icon');
            iconImg.classList.add('active-icon');
            
            // Agora redireciona para a página
            setTimeout(() => {
                window.location.href = link.href;
            }, 100);  // Atraso para permitir a animação da troca de cor
        });
    });
});

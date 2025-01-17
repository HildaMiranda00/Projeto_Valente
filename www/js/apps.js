$(document).ready(function () {
    const pages = {
        index: $('#index'),
        leis: $('#leis'),
        denuncia: $('#denuncia'),
        agenda: $('#agenda'),
        chatbot: $('#chatbot'),
    };

    $('.nav-link').on('click', function (e) {
        e.preventDefault();
        const page = $(this).data('page');

        $('.page').hide();

        if (pages[page]) {
            pages[page].show();

            if (page === 'chatbot') {
                initializeChatbotEvents();
            }
        }
    });

    function initializeChatbotEvents() {
        $('#submit-btn').off('click').on('click', function () {
            const context = $('#context').val();
            const question = $('#question').val();

            if (!context || !question) {
                $('#response').html('<p>Por favor, insira tanto o contexto quanto a pergunta.</p>');
                return;
            }

            $.ajax({
                url: 'https://10.0.2.2:8000/api/chatbot/', 
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ context, question }),
                success: function (response) {
                    $('#response').html(`<p>Resposta: ${response.answer || 'Não foi possível obter uma resposta.'}</p>`);
                },
                error: function (error) {
                    $('#response').html(`<p>Erro: ${error.responseJSON?.error || 'Erro desconhecido'}</p>`);
                },
            });
        });
    }

    $('.page').hide();
    $('#index').show();
});

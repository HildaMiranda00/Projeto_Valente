document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('event-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("https://backend-cool-forest-8585.fly.dev/management/create_event/", {
        method: 'POST',
        body: formData,
        credentials: 'include', 
      });

      if (response.ok) {
        const result = await response.json();

        if (result.status === 201) {
          alert('Evento criado com sucesso!');
          window.location.href = '/management/event_list/';
        } else {
          alert(result.message || 'Erro ao criar o evento.');
        }
      } else if (response.status === 403) {
        alert('Você precisa estar logado para realizar esta ação.');
      } else {
        const errorText = await response.text();
        console.error('Erro no servidor:', errorText);
        alert('Erro ao enviar os dados.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na requisição. Verifique sua conexão.');
    }
  });
});

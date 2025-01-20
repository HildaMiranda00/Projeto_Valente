document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("fetch-laws");
    const lawsContainer = document.getElementById("laws-container");

    fetchButton.addEventListener("click", async () => {
        const query = "exploração abuso sexual crianças";

        // URL do servidor proxy
        const proxyUrl = `http://localhost:3000/proxy?query=${encodeURIComponent(query)}`;

        lawsContainer.innerHTML = "<p>Carregando resultados...</p>";

        try {
            const response = await fetch(proxyUrl);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados da API.");
            }

            const data = await response.json();
            const items = data.documentos || [];

            if (items.length > 0) {
                lawsContainer.innerHTML = items
                    .map(
                        (item) => `
                        <div class="law-item">
                            <h2><a href="${item.titulo}" target="_blank">${item.titulo}</a></h2>
                            <p>${item.ementa || "Sem resumo disponível."}</p>
                        </div>
                    `
                    )
                    .join("");
            } else {
                lawsContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
            }
        } catch (error) {
            lawsContainer.innerHTML = `<p>Erro ao carregar resultados: ${error.message}</p>`;
        }
    });
});

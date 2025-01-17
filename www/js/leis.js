document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("fetch-laws");
    const lawsContainer = document.getElementById("laws-container");

    fetchButton.addEventListener("click", async () => {
        const apiKey = "SUA_API_KEY"; // Substitua pela sua chave da API
        const cx = "SEU_CX_CODE"; // Substitua pelo código do mecanismo de busca
        const query = "leis exploração abuso sexual crianças site:.gov.br";

        const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
            query
        )}&key=${apiKey}&cx=${cx}`;

        lawsContainer.innerHTML = "<p>Carregando resultados...</p>";

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados da API.");
            }

            const data = await response.json();
            const items = data.items || [];

            if (items.length > 0) {
                lawsContainer.innerHTML = items
                    .map(
                        (item) => `
                        <div class="law-item">
                            <h2>${item.title}</h2>
                            <p>${item.snippet}</p>
                            <a href="${item.link}" target="_blank">Leia mais</a>
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

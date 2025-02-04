document.addEventListener("DOMContentLoaded", function () {
    const filtroLeis = document.getElementById("filtroLeis");

    if (filtroLeis) {
        filtroLeis.addEventListener("change", filterCards);
    }
});

function filterCards() {
    const filtroLeis = document.getElementById("filtroLeis");
    const filterValue = filtroLeis.value;
    const cards = document.querySelectorAll(".law-card");

    cards.forEach(card => {
        if (filterValue === "all" || card.classList.contains(filterValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
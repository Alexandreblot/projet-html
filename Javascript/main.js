function delayNavigation(event) {
    // Ne pas agir sur les liens externes ou ancres
    const url = event.currentTarget.getAttribute("href");
    if (!url || url.startsWith("http") || url.startsWith("#") || url.startsWith("mailto:")) return;


if (url.includes("equipe.html")) {
        const confirmation = confirm("Voulez-vous vraiment accéder à la page Équipe ? (c jules qui l'a fait)");
        if (!confirmation) {
            event.preventDefault();
            return; // Annule la navigation si l'utilisateur refuse
        }
    }

    event.preventDefault();
    const loader = document.getElementById("loader");
    if (loader) loader.classList.remove("hidden");

    setTimeout(() => {
        if (loader) loader.classList.add("hidden");
        window.location.href = url;
    }, 2000);
}

function setupNavigationDelay() {
    const links = document.querySelectorAll("a[href]");
    links.forEach(link => {
        link.addEventListener("click", delayNavigation);
    });
}

function setupMenuItemHighlight() {
    // Sélectionne tous les liens du menu principal et navigation
    const menuLinks = document.querySelectorAll('.navbar a, .navigation a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Sauvegarde l'ancienne couleur de fond
            const oldColor = window.getComputedStyle(link).backgroundColor;
            // Choisis la nouvelle couleur
            const newColor = 'yellow';

            // Change la couleur de fond de l'item cliqué
            link.style.backgroundColor = newColor;

            // Affiche dans la console
            console.log(`Changement de couleur pour "${link.textContent.trim()}": Ancienne couleur = ${oldColor}, Nouvelle couleur = ${newColor}`);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupNavigationDelay();
    setupMenuItemHighlight();
});

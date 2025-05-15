function delayNavigation(event) {
    event.preventDefault(); // Empêche la navigation immédiate
    const targetUrl = event.currentTarget.href; // Récupère l'URL cible

    // Affiche le loader
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.remove("hidden");
    }

    // Délai de 2 secondes avant la navigation
    setTimeout(() => {
        if (loader) {
            loader.classList.add("hidden"); // Masque le loader avant de naviguer
        }
        window.location.href = targetUrl; // Navigue vers l'URL après 2 secondes
    }, 2000);
}

function setupNavigationDelay() {
    const links = document.querySelectorAll("a[href]"); // Sélectionne tous les liens avec un attribut href
    links.forEach((link) => {
        link.addEventListener("click", delayNavigation); // Ajoute un écouteur d'événement
    });
}

function main() {
    setupNavigationDelay(); // Configure le délai de navigation
}

main();

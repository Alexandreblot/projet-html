function delayNavigation(event) {
    // Ne pas agir sur les liens externes ou ancres
    const url = event.currentTarget.getAttribute("href");
    if (!url || url.startsWith("http") || url.startsWith("#") || url.startsWith("mailto:")) return;

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

document.addEventListener("DOMContentLoaded", setupNavigationDelay);

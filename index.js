function animateSlogan() {
    const sloganElement = document.getElementById("slogan");
    if (!sloganElement) return;

    const slogan = "Une musique qui vous fait vibrer";
    const words = slogan.split(" ");
    let index = 0;
    let wordInterval = null;

    function showWords() {
        sloganElement.textContent = "";
        index = 0;
        clearInterval(wordInterval);
        wordInterval = setInterval(() => {
            sloganElement.textContent = words.slice(0, index + 1).join(" ");
            index++;
            if (index >= words.length) {
                clearInterval(wordInterval);
                setTimeout(animateTranslation, 1000);
            }
        }, 1000);
    }

    function animateTranslation() {
        sloganElement.style.transition = "none";
        sloganElement.style.transform = "translateX(0)";
        void sloganElement.offsetWidth;
        sloganElement.style.transition = "transform 0.5s";
        sloganElement.style.transform = "translateX(100px)";
        setTimeout(() => {
            sloganElement.style.transform = "translateX(-100px)";
            setTimeout(() => {
                sloganElement.style.transform = "translateX(0)";
                setTimeout(() => {
                    sloganElement.style.transition = "none";
                    sloganElement.textContent = "";
                    showWords();
                }, 500);
            }, 500);
        }, 500);
    }

    // Démarre l'animation
    sloganElement.textContent = "";
    sloganElement.style.transition = "none";
    sloganElement.style.transform = "translateX(0)";
    showWords();
}

document.addEventListener("DOMContentLoaded", () => {
    setupNavigationDelay();
    setupMenuItemHighlight();
    animateSlogan();
});
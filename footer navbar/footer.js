// Sélectionner tous les éléments contenant un numéro de téléphone (ex: classe 'phone-number')
document.querySelectorAll('.phone-number').forEach(function(element) {
    element.addEventListener('copy', function(e) {
        // Empêcher le comportement par défaut pour personnaliser le prompt
        e.preventDefault();
        // Récupérer le numéro copié
        const phoneNumber = element.textContent.trim();
        // Afficher le prompt
        const userInput = prompt(
            `Si vous voulez appeler ce numéro :\n${phoneNumber},\nentrez le de nouveau dans le champ ci-dessous puis validez`
        );
        if (userInput && userInput.trim() === phoneNumber) {
            console.log(`vous appelez ce numéro : ${phoneNumber}`);
            // Jouer la sonnerie
            playRingtone(5); // 5 secondes
        }
        // Copier le numéro dans le presse-papier malgré tout
        if (navigator.clipboard) {
            navigator.clipboard.writeText(phoneNumber);
        }
    });
});

// Fonction pour jouer une sonnerie pendant 'duration' secondes
function playRingtone(duration) {
    const audio = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa6c3e.mp3'); // Sonnerie libre de droits
    audio.play();
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, duration * 1000);
}









const form = document.getElementById('contact-form'); // Sélectionne le formulaire de contact
const nameInput = document.getElementById('name');// Sélectionne le champ de saisie du nom
const emailInput = document.getElementById('email'); // Sélectionne le champ de saisie de l'email
const messageInput = document.getElementById('message');// Sélectionne le champ de saisie du message
const submitBtn = document.getElementById('submit-btn');// Sélectionne le bouton de soumission

let modal = document.getElementById("modal-jeux");
let modalContent = document.querySelector("#modal-jeux .modal-content");
// Fonction pour afficher le modal

function validateForm() {

    let isValid = true; //si tout est bien rempli

    // Prénom Nom : au moins 2 mots
    const valeurnom = nameInput.value.trim(); //enlève les espaces inutiles
    if (!valeurnom || valeurnom.split(' ').length < 2) { // Vérifie s'il y a au moins 2 mots et s'il n'est pas vide
        document.getElementById('name-error').textContent = "Veuillez entrer Prénom Nom (séparés par un espace).";
        isValid = false;
    } else {
        document.getElementById('name-error').textContent = "";
    }

    // Email : doit contenir @ et .
    const emailValeur = emailInput.value.trim(); // enleve les espaces inutiles
    if (!emailValeur.includes('@') || !emailValeur.includes('.')) {
        document.getElementById('email-error').textContent = "Veuillez entrer une adresse e-mail valide.";
        isValid = false;
    } else {
        document.getElementById('email-error').textContent = "";
    }

    // Message : 15 à 1000 caractères
    const messageValeur = messageInput.value.trim(); // enleve les espaces inutiles
    if (messageValeur.length < 15 || messageValeur.length > 1000) {
        document.getElementById('message-error').textContent = "Le message doit contenir entre 15 et 1000 caractères.";
        isValid = false; // si le message n'est pas entre 15 et 1000 caractères
    } else {
        document.getElementById('message-error').textContent = "";
    }

    submitBtn.disabled = !isValid; // désactive le bouton de soumission si le formulaire n'est pas valide
    return isValid;
}

nameInput.addEventListener("input", validateForm); // écoute les changements dans le champ de saisie du nom
emailInput.addEventListener("input", validateForm); // écoute les changements dans le champ de saisie de l'email
messageInput.addEventListener("input", validateForm); // écoute les changements dans le champ de saisie du message
validateForm(); // Valide le formulaire au chargement de la page

form.addEventListener("submit", function(e) { //quand on soumet le formulaire
    e.preventDefault(); 
    if (validateForm()) { // si le formulaire est valide
        console.log("Formulaire valide !");
        modal.classList.remove("hidden");
        
    }
});

const pfcButtons = document.querySelectorAll(".pfc-button"); // Sélectionne tous les boutons de pierre, feuille, ciseaux


pfcButtons.forEach(btn => {
    btn.onclick = function() {
        const user = btn.dataset.choice; //le choix de l'utilisateur (pierre, feuille, ciseaux)
        const choix = ["pierre", "feuille", "ciseaux"];
        const ordi = choix[Math.floor(Math.random() * 3)]; //choix aléatoire de l'ordinateur

        if (
            (user === "pierre" && ordi === "ciseaux") ||
            (user === "feuille" && ordi === "pierre") ||
            (user === "ciseaux" && ordi === "feuille")
        ) {
            document.getElementById("pfc-result").classList.remove("hidden");
            setTimeout(() => {
                document.getElementById("pfc-result").classList.add("hidden");
                modal.classList.add("hidden");
            }, 4000);
        } 
        else if (user === ordi) {
            document.getElementById("pfc-tie").classList.remove("hidden");
            setTimeout(() => {
                document.getElementById("pfc-tie").classList.add("hidden");
                modal.classList.add("hidden");
            }, 2000);
        }
        else {
            document.getElementById("pfc-close").classList.remove("hidden");
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    };
});
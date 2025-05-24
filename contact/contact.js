document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const sendBtn = document.querySelector("button[type='submit']");
    const form = document.querySelector("form");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    function validateName() {
        const value = nameInput.value.trim();
        if (!value || value.split(" ").length < 2) {
            nameError.textContent = "Veuillez entrer Prénom Nom (2 mots séparés par un espace).";
            return false;
        }
        nameError.textContent = "";
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        if (!value.includes("@") || !value.includes(".")) {
            emailError.textContent = "Veuillez entrer une adresse e-mail valide.";
            return false;
        }
        emailError.textContent = "";
        return true;
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        if (value.length < 20 || value.length > 1000) {
            messageError.textContent = "Le message doit contenir entre 20 et 1000 caractères.";
            return false;
        }
        messageError.textContent = "";
        return true;
    }

    function validateForm() {
        const valid = validateName() & validateEmail() & validateMessage();
        sendBtn.disabled = !valid;
        sendBtn.style.opacity = valid ? "1" : "0.5";
        return !!valid;
    }

    nameInput.addEventListener("input", validateForm);
    emailInput.addEventListener("input", validateForm);
    messageInput.addEventListener("input", validateForm);

    // Désactive le bouton au chargement
    validateForm();

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validateForm()) return;

        // Jeu : Pierre-Feuille-Ciseaux
        let userChoice = prompt("Jeu : Pierre, Feuille ou Ciseaux ?").toLowerCase();
        const choices = ["pierre", "feuille", "ciseaux"];
        if (!choices.includes(userChoice)) {
            alert("Choix invalide. Essayez encore !");
            return;
        }
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        alert("Ordinateur : " + computerChoice);

        if (
            (userChoice === "pierre" && computerChoice === "ciseaux") ||
            (userChoice === "feuille" && computerChoice === "pierre") ||
            (userChoice === "ciseaux" && computerChoice === "feuille")
        ) {
            alert("Bravo, vous avez gagné ! Votre message a été envoyé.");
        } else if (userChoice === computerChoice) {
            alert("Égalité ! Rejouez pour envoyer votre message.");
        } else {
            alert("Dommage, vous avez perdu. Le formulaire va être réinitialisé.");
            form.reset();
            validateForm();
        }
    });
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    // Affiche la modale du jeu
    const modal = document.getElementById("pfc-modal");
    const resultDiv = document.getElementById("pfc-result");
    const closeBtn = document.getElementById("pfc-close");
    modal.classList.remove("hidden");
    resultDiv.textContent = "";
    closeBtn.style.display = "none";

    function handleChoice(e) {
        if (!e.target.dataset.choice) return;
        const userChoice = e.target.dataset.choice;
        const choices = ["pierre", "feuille", "ciseaux"];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        let result = "";
        if (
            (userChoice === "pierre" && computerChoice === "ciseaux") ||
            (userChoice === "feuille" && computerChoice === "pierre") ||
            (userChoice === "ciseaux" && computerChoice === "feuille")
        ) {
            result = "Bravo, vous avez gagné ! Votre message a été envoyé.";
            closeBtn.style.display = "inline-block";
        } else if (userChoice === computerChoice) {
            result = "Égalité ! Rejouez pour envoyer votre message.";
        } else {
            result = "Dommage, vous avez perdu. Le formulaire va être réinitialisé.";
            closeBtn.style.display = "inline-block";
        }
        resultDiv.textContent = `Ordinateur : ${computerChoice} | ${result}`;

        if (result.includes("perdu")) {
            closeBtn.onclick = function() {
                modal.classList.add("hidden");
                form.reset();
                validateForm();
            };
        } else if (result.includes("gagné")) {
            closeBtn.onclick = function() {
                modal.classList.add("hidden");
            };
        }
    }

    // Ajoute les listeners sur les boutons du jeu
    modal.querySelectorAll(".pfc-choices button").forEach(btn => {
        btn.onclick = handleChoice;
    });
});

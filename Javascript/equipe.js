function Gratage(){
  const canvases = document.querySelectorAll(".grattage-canvas");

  canvases.forEach((canvas) => {
    const img = canvas.previousElementSibling; // Image juste avant le canvas

    function setupCanvas() {
      const width = img.offsetWidth;
      const height = img.offsetHeight;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      // Dégradé gris métallique pour l'effet de grattage
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#d4d4d4");
      gradient.addColorStop(0.3, "#c0c0c0");
      gradient.addColorStop(0.6, "#a9a9a9");
      gradient.addColorStop(1, "#d4d4d4");
      ctx.fillStyle = gradient;

      // Rayon adapté à la taille minimale (hauteur/largeur)
      const radius = Math.min(width, height) / 2;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.fill();

      let isDrawing = false;

      canvas.parentElement.addEventListener("mousedown", () => {
        isDrawing = true;
      });
      canvas.parentElement.addEventListener("mouseup", () => {
        isDrawing = false;
      });
      canvas.parentElement.addEventListener("mouseleave", () => {
        isDrawing = false;
      });

      canvas.parentElement.addEventListener("mousemove", (e) => {
        if (!isDrawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      });
    }

    // Attendre que l’image soit bien chargée avant d’initialiser le canvas
    if (img.complete) {
      setupCanvas();
    } else {
      img.onload = setupCanvas;
    }
  });
}

function enableEditMode() {
    isEditing = true;
    const editBtn = document.getElementById("editButton");
    editBtn.textContent = "Quitter le mode édition";
    editBtn.style.backgroundColor = "red";

    // Rendre les noms éditables
    document.querySelectorAll(".team-member-info h3").forEach(h3 => {
        h3.contentEditable = "true";
        h3.style.border = "1px dashed gray";
    });

    // Ajouter le bouton "Ajouter un membre"
    if (!document.getElementById("addMemberButton")) {
        const addBtn = document.createElement("button");
        addBtn.textContent = "Ajouter un membre";
        addBtn.id = "addMemberButton";
        addBtn.style.margin = "1rem";
        addBtn.onclick = addMember;
        document.querySelector(".team-section").appendChild(addBtn);
    }

    // Ajouter un bouton suppression à chaque carte
    document.querySelectorAll(".team-member").forEach(member => {
        addDeleteButton(member);
    });
}
function disableEditMode() {
    isEditing = false;
    const editBtn = document.getElementById("editButton");
    editBtn.textContent = "En savoir plus";
    editBtn.style.backgroundColor = "";

    // Rendre les noms non éditables
    document.querySelectorAll(".team-member-info h3").forEach(h3 => {
        h3.contentEditable = "false";
        h3.style.border = "none";
    });

    // Supprimer le bouton d’ajout
    const addBtn = document.getElementById("addMemberButton");
    if (addBtn) addBtn.remove();

    // Supprimer tous les boutons suppression
    document.querySelectorAll(".delete-button").forEach(btn => btn.remove());
}

function addMember() {
    const container = document.getElementById("teamContainer");

    const member = document.createElement("div");
    member.className = "team-member";

    member.innerHTML = `
        <div class="team-photo">
            <img src="../image/default.jpg" alt="Photo par défaut">
            <canvas class="grattage-canvas"></canvas>
        </div>
        <div class="team-member-info">
            <h3 contenteditable="true">Votre Nom</h3>
            <p>Votre description...</p>
        </div>
    `;
    addDeleteButton(member);
    container.appendChild(member);
}

function addDeleteButton(memberElement) {
    if (memberElement.querySelector(".delete-button")) return;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.className = "delete-button";
        deleteBtn.style.marginTop = "0.5rem";
        deleteBtn.onclick = () => memberElement.remove();
        memberElement.querySelector(".team-member-info").appendChild(deleteBtn);
}



function main() {
    grattage();
}


function main() {
  Gratage();
  document.querySelectorAll('.team__member').forEach(member => {
  member.style.cursor = 'pointer';
  member.addEventListener('click', () => {
      const name = member.dataset.name;
      window.location.href = `profil-${name}.html`; // Redirection vers une page
    });
  });
  let isEditing = false;

  document.getElementById("editButton").addEventListener("click", function () {
    if (!isEditing) {
        const username = prompt("Entrez le nom d'utilisateur administrateur :");
        if (username !== "admin") {
            alert("Nom d'utilisateur incorrect.");
            return;
        }

        const password = prompt("Entrez le mot de passe administrateur :");
        if (password !== "admin_pwd") {
            alert("Mot de passe incorrect.");
            return;
        }

        enableEditMode();
    } else {
        disableEditMode();
    }
});

  

  prompt();
}

window.addEventListener("DOMContentLoaded", main);


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

function prompt(){
  const adminName = window.prompt("Entrez le nom du profil administrateur :", "admin");
  if (adminName === "admin") {
    const adminPwd = window.prompt("Entrez le mot de passe du profil administrateur :", "admin_pwd");
    if (adminPwd === "admin_pwd") {
      // Activer le mode édition
      const editBtn = document.getElementById("edit-btn");
      if (editBtn) {
        editBtn.classList.add("active");
        editBtn.style.backgroundColor = "#4caf50";
      }

      // Rendre les noms éditables
      document.querySelectorAll(".member-name").forEach((el) => {
        el.contentEditable = "true";
        el.style.borderBottom = "1px dashed #888";
      });

      // Afficher le bouton "ajouter un membre"
      let addBtn = document.getElementById("add-member-btn");
      if (!addBtn) {
        addBtn = document.createElement("button");
        addBtn.id = "add-member-btn";
        addBtn.textContent = "Ajouter un membre";
        addBtn.style.margin = "10px";
        addBtn.onclick = function () {
          // Ajoutez ici la logique pour ajouter un membre
          alert("Ajout d'un membre (fonctionnalité à implémenter)");
        };
        document.body.appendChild(addBtn);
        }

        // Ajouter gestion du bouton édition pour quitter le mode édition
        const editBtn2 = document.getElementById("edit-btn");
        if (editBtn2) {
          editBtn2.onclick = function () {
            if (editBtn2.classList.contains("active")) {
              if (window.confirm("Voulez-vous vraiment quitter le mode édition ?")) {
                editBtn2.classList.remove("active");
                editBtn2.style.backgroundColor = "";
                document.querySelectorAll(".member-name").forEach((el) => {
                  el.contentEditable = "false";
                  el.style.borderBottom = "";
                });
                const addBtn = document.getElementById("add-member-btn");
                if (addBtn) addBtn.remove();
              }
            }
          };
        }
      }
  }
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

  prompt();
}

window.addEventListener("DOMContentLoaded", main);


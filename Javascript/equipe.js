function main() {
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

window.addEventListener("DOMContentLoaded", main);

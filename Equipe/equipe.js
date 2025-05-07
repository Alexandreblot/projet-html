// Sélectionne le canvas
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Ajuste la taille du canvas à celle de la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Remplit le canvas avec une couleur ou une image
ctx.fillStyle = 'gray'; // Couleur de grattage
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Ajoute une image en dessous
const backgroundImage = new Image();
backgroundImage.src = 'path_to_your_image.jpg'; // Remplace par le chemin de ton image
backgroundImage.onload = () => {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

// Active l'effet de grattage
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, false); // Taille du "grattage"
    ctx.fill();
});
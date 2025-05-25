// --- Flèche vers le haut ---
document.addEventListener('DOMContentLoaded', function () {
    // Crée l'icône flèche si elle n'existe pas déjà
    let arrow = document.getElementById('scrollToTop');
    if (!arrow) {
        arrow = document.createElement('div');
        arrow.id = 'scrollToTop';
        arrow.style.position = 'fixed';
        arrow.style.right = '30px';
        arrow.style.bottom = '80px';
        arrow.style.cursor = 'pointer';
        arrow.style.zIndex = '1000';
        arrow.innerHTML = '⬆️'; // Utilisez une icône SVG ou FontAwesome pour un meilleur rendu
        document.body.appendChild(arrow);
    }
    arrow.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// --- Alternance d'image produit ---
function toggleProductImage(imgElement, imgSrc1, imgSrc2) {
    imgElement.src = (imgElement.src.endsWith(imgSrc1)) ? imgSrc2 : imgSrc1;
}

// Exemple d'utilisation :
// <img src="img1.jpg" onclick="toggleProductImage(this, 'img1.jpg', 'img2.jpg')" />

// --- Filtrage des produits ---
const products = [
    // Exemple de structure produit
    // { name: 'Produit 1', theme: 'Tech', price: 50, date: '2024-06-01', img1: 'img1.jpg', img2: 'img2.jpg' }
    // Remplir avec vos produits
];

// Fonction de filtrage
function filterProducts(filters) {
    return products.filter(product => {
        const nameMatch = !filters.name || product.name.toLowerCase().includes(filters.name.toLowerCase());
        const themeMatch = !filters.theme || product.theme === filters.theme;
        const priceMatch = (!filters.minPrice || product.price >= filters.minPrice)
            && (!filters.maxPrice || product.price <= filters.maxPrice);
        const dateMatch = (!filters.date || product.date === filters.date);
        return nameMatch && themeMatch && priceMatch && dateMatch;
    });
}

// Exemple de gestion du formulaire de filtre
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('filterForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const filters = {
                name: form.elements['name'].value,
                theme: form.elements['theme'].value,
                minPrice: parseFloat(form.elements['minPrice'].value) || undefined,
                maxPrice: parseFloat(form.elements['maxPrice'].value) || undefined,
                date: form.elements['date'].value
            };
            const filtered = filterProducts(filters);
            displayProducts(filtered);
        });
    }
});

// Fonction d'affichage des produits (à adapter selon votre HTML)
function displayProducts(productList) {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    container.innerHTML = '';
    productList.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.img1}" onclick="toggleProductImage(this, '${product.img1}', '${product.img2}')">
            <h3>${product.name}</h3>
            <p>Thème : ${product.theme}</p>
            <p>Prix : ${product.price} €</p>
            <p>Date : ${product.date}</p>
        `;
        container.appendChild(div);
    });
}

// Initialisation de l'affichage
document.addEventListener('DOMContentLoaded', function () {
    displayProducts(products);
});
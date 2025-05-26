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

const productList = [
    {
        name: "Ukulélé",
        img1: "../image/quelques-ukuleles.jpg",
        img2: "../image/ukulele2.jpg",
        price :"75"
    
    },
    {
        name: "Piano à queue",
        img1: "../image/piano.jpg",
        img2: "../image/piano2.jpg",
        price :"1200"
    },

    {
        name: "Une ampli",
        img1: "../image/ampli.jpg",
        img2: "../image/ampli2.jpg",
        price: "100"
    },

    {
        name: "Une guitar basse ",
        img1: "../image/guitarbass.jpg",
        img2: "../image/guitarbass2.jpg",
        price: "999"
    },
    
    {
        name: "Une Harpe",
        img1: "../image/Harpe.jpg",
        img2: "../image/Harpe2.jpg",
        price:"600"
    },

    {
        name: "Une Batterie",
        img1: "../image/Batterie.jpg",
        img2: "../image/Batterie2.jpg",
        price:"1000"
    },

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
            <h3>${product.name}</h3
            <h3>${product.price}<h3>`;
    

        container.appendChild(div);
    });
}


function toggleProductImage(imgElement, img1, img2) {
    imgElement.src = (imgElement.src.includes(img1)) ? img2 : img1;
}

// Appelle la fonction au chargement
document.addEventListener("DOMContentLoaded", () => {
    displayProducts(productList);
});


// Initialisation de l'affichage
document.addEventListener('DOMContentLoaded', function () {
    displayProducts(products);
});
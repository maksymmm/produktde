// public/scripts.js
const translations = {
  de: {
    search_placeholder: "Was suchen Sie heute?",
    account: "Mein Konto",
    cart: "Warenkorb",
    hero_title: "Willkommen bei ProduktDE",
    hero_subtitle: "Entdecken Sie hochwertige Produkte Made in Germany",
    hero_cta: "Jetzt shoppen",
    bestsellers_title: "Bestseller — Made in Germany",
    buy_now: "Jetzt kaufen",
    footer_shop: "Einkaufen",
    footer_all_categories: "Alle Kategorien",
    footer_offers: "Angebote",
    footer_new_arrivals: "Neuheiten",
    footer_service: "Service",
    footer_customer_service: "Kundenservice",
    footer_returns: "Rückgabe",
    footer_shipping: "Versand",
    footer_company: "Unternehmen",
    footer_about_us: "Über uns",
    footer_careers: "Karriere",
    footer_press: "Presse",
    footer_legal: "Rechtliches",
    footer_terms: "AGB",
    footer_privacy: "Datenschutz",
    footer_imprint: "Impressum",
    footer_copyright: "© 2025 ProduktDE GmbH. Alle Rechte vorbehalten."
  },
  en: {
    search_placeholder: "What are you looking for today?",
    account: "My Account",
    cart: "Cart",
    hero_title: "Welcome to ProduktDE",
    hero_subtitle: "Discover high-quality products Made in Germany",
    hero_cta: "Shop Now",
    bestsellers_title: "Bestsellers — Made in Germany",
    buy_now: "Buy Now",
    footer_shop: "Shop",
    footer_all_categories: "All Categories",
    footer_offers: "Offers",
    footer_new_arrivals: "New Arrivals",
    footer_service: "Service",
    footer_customer_service: "Customer Service",
    footer_returns: "Returns",
    footer_shipping: "Shipping",
    footer_company: "Company",
    footer_about_us: "About Us",
    footer_careers: "Careers",
    footer_press: "Press",
    footer_legal: "Legal",
    footer_terms: "Terms & Conditions",
    footer_privacy: "Privacy Policy",
    footer_imprint: "Imprint",
    footer_copyright: "© 2025 ProduktDE GmbH. All rights reserved."
  }
};

// Preloader
window.addEventListener('load', () => {
  document.querySelector('.preloader').classList.add('hidden');
});

// Language Switcher
let currentLang = 'de';
const languageButtons = document.querySelectorAll('.language-btn');
const translatableElements = document.querySelectorAll('[data-lang-key]');

function setLanguage(lang) {
  currentLang = lang;
  translatableElements.forEach(element => {
    const key = element.getAttribute('data-lang-key');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  document.querySelector('.search-input').placeholder = translations[lang].search_placeholder;
  document.documentElement.lang = lang;
  languageButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  loadProducts();
}

languageButtons.forEach(button => {
  button.addEventListener('click', () => {
    setLanguage(button.getAttribute('data-lang'));
  });
});

// Load Products from Backend
async function loadProducts() {
  try {
    const response = await fetch(`http://localhost:3000/products?lang=${currentLang}`);
    const products = await response.json();
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <a href="${product.purchase_url}">
          <img src="${product.image_url}" alt="${product.name}" class="gallery-image" loading="lazy"
               onerror="this.src='https://via.placeholder.com/300x250?text=${product.name}'">
        </a>
        <div style="padding: 1.5rem;">
          <h3>${product.name}</h3>
          <div style="color: var(--accent); font-weight: bold; font-size: 1.25rem;" class="price">€ ${product.price.toFixed(2)}</div>
          <div style="color: var(--gray); margin-bottom: 1rem;">${product.description}</div>
          <a href="${product.purchase_url}" class="btn btn-primary">${translations[currentLang].buy_now}</a>
        </div>
      `;
      productList.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Cart
const cart = JSON.parse(localStorage.getItem('cart')) || [];
function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(translations[currentLang].cart + ' updated!');
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('btn-primary')) {
    const productCard = e.target.closest('.product-card');
    const product = {
      name: productCard.querySelector('h3').textContent,
      price: productCard.querySelector('.price').textContent,
      url: e.target.href
    };
    addToCart(product);
  }
});

// Search Suggestions
const searchInput = document.querySelector('.search-input');
const suggestions = ['Bosch Waschmaschine', 'WMF Topfset', 'Siemens Kaffeevollautomat'];
const datalist = document.getElementById('search-suggestions');

searchInput.addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  datalist.innerHTML = '';
  if (query) {
    suggestions
      .filter(item => item.toLowerCase().includes(query))
      .forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        datalist.appendChild(option);
      });
  }
});

// Initial Load
loadProducts();

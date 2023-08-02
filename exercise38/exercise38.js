// TOGGLES
document.querySelector(".jsFilter").addEventListener("click", () => {
  document.querySelector(".filter-menu").classList.toggle("active");
});

document.querySelector(".grid").addEventListener("click", () => {
  document.querySelector(".list").classList.remove("active");
  document.querySelector(".grid").classList.add("active");
  document.querySelector(".products-area-wrapper.gridView").classList.add("active");
  document.querySelector(".products-area-wrapper.tableView").classList.remove("active");

  document.querySelector("#filterButtonWrapper").style.display = "";
  document.querySelector("#searchBar").style.display = "";
});

document.querySelector(".list").addEventListener("click", () => {
  document.querySelector(".list").classList.add("active");
  document.querySelector(".grid").classList.remove("active");
  document.querySelector(".products-area-wrapper.gridView").classList.remove("active");
  document.querySelector(".products-area-wrapper.tableView").classList.add("active");

  document.querySelector("#filterButtonWrapper").style.display = "none";
  document.querySelector("#searchBar").style.display = "none";
});

const modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  modeSwitch.classList.toggle('active');
});

// TODO: implement later when it happens to be implemented other pages
// const sidebarLinks = document.querySelectorAll('.sidebar-link');

// sidebarLinks.forEach((link) => {
//   link.addEventListener('click', () => {
//     sidebarLinks.forEach((link) => {
//       link.classList.remove('is-active');
//     });
//     link.classList.add('is-active');
//   });
// });

window.addEventListener('resize', () => {
  const sidebar = document.querySelector('.sidebar');
  if (window.innerWidth > 1090) {
    sidebar.classList.remove('collapse');
  } else {
    sidebar.classList.add('collapse');
  }
});

const apiURL = 'https://64b70d31df0839c97e166026.mockapi.io/api/products';

async function getProducts() {
  try {
    const response = await fetch(apiURL);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function renderProducts(products) {
  const productsArea = document.querySelector('.products-area-wrapper.gridView');
  productsArea.innerHTML = '';

  if (products.length === 0) {
    productsArea.innerHTML = '<p>Nenhum produto encontrado</p>';
    return;
  }

  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('products-row');
    productCard.innerHTML = `
    <button class="cell-more-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-more-vertical">
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
      </svg>
    </button>
    <div class="product-cell image">
        <div class="product-image">
            <img src="${product.image}" alt="product">
            <span class="product-description">${product.description}</span>
        </div>
        <span>${product.name}</span>
    </div>
    <div class="product-cell"><span class="cell-label">Categoria:</span>${product.category}</div>
    <div class="product-cell"><span class="cell-label">Preço:</span>R$ ${product.price.toFixed(2)}</div>
    <div class="product-cell"><button type="button" class="btn">Adicionar</button></div>
    `;

    productsArea.appendChild(productCard);
  });
}

async function filterProducts() {
  const products = await getProducts();
  const filter = document.querySelector('#filterProductInput').value;

  if (filter === 'all') {
    renderProducts(products);
    return;
  }

  const filteredProducts = products.filter(product => product.category === filter);
  renderProducts(filteredProducts);
}

document.addEventListener('DOMContentLoaded', async () => {
  filterProducts();
});

document.querySelector('#filterApplyBtn').addEventListener('click', async () => {
  filterProducts();
});

document.querySelector('#filterResetBtn').addEventListener('click', async () => {
  document.querySelector('#filterProductInput').value = 'all';
  filterProducts();
});

document.querySelector('#searchBar').addEventListener('keyup', async () => {
  const products = await getProducts();
  const search = document.querySelector('#searchBar').value;

  if (search === '') {
    renderProducts(products);
    return;
  }

  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
  renderProducts(filteredProducts);
});
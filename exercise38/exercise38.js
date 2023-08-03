// EVENTS
document.querySelector('.jsFilter').addEventListener('click', () => {
  document.querySelector('.filter-menu').classList.toggle('active');
});

document.querySelector('.grid').addEventListener('click', () => {
  document.querySelector('.list').classList.remove('active');
  document.querySelector('.grid').classList.add('active');
  document
    .querySelector('.products-area-wrapper.gridView')
    .classList.add('active');
  document
    .querySelector('.products-area-wrapper.tableView')
    .classList.remove('active');

  document.querySelector('#filterButtonWrapper').style.display = '';
  document.querySelector('#searchBar').style.display = '';
});

document.querySelector('.list').addEventListener('click', () => {
  document.querySelector('.list').classList.add('active');
  document.querySelector('.grid').classList.remove('active');
  document
    .querySelector('.products-area-wrapper.gridView')
    .classList.remove('active');
  document
    .querySelector('.products-area-wrapper.tableView')
    .classList.add('active');

  document.querySelector('#filterButtonWrapper').style.display = 'none';
  document.querySelector('#searchBar').style.display = 'none';
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

document.addEventListener('DOMContentLoaded', async () => {
  const products = await getProducts();
  await filterProducts();
  await renderCategories(products);
  showAssociatedTable();
});

document
  .querySelector('#filterApplyBtn')
  .addEventListener('click', async () => {
    filterProducts();
  });

document
  .querySelector('#filterResetBtn')
  .addEventListener('click', async () => {
    document.querySelector('#filterProductInput').value = 'all';
    filterProducts();
  });

document.querySelector('#searchBar').addEventListener('keyup', async () => {
  const products = await filterProducts();
  const search = document.querySelector('#searchBar').value;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  renderProducts(filteredProducts);
});

document.querySelector('#associatedTableBtn').addEventListener('click', () => {
  const tableInput = document.querySelector('#associatedTableInput');

  if (tableInput.value === '') {
    tableInput.focus();
    return;
  }

  localStorage.setItem('associatedTable', tableInput.value);
  showAssociatedTable();
});

document.querySelector('#addOrderBtn').addEventListener('click', async () => {
  const productId = document.querySelector('#addOrderBtn').dataset.productId;
  const quantity = document.querySelector('#addOrderBtn').dataset.quantity;

  const order = {
    productId,
    quantity: Number(quantity),
  };

  postOrder(order);
});

document
  .querySelector('#productDialogQuantity')
  .addEventListener('change', () => {
    const quantity = document.querySelector('#productDialogQuantity').value;
    document.querySelector('#addOrderBtn').dataset.quantity = quantity;
  });

// DIALOG
const dialog = document.querySelector('#productDialog');
dialog.addEventListener('click', () => {
  setCloseModal();
});

const dialogBody = document.querySelector('#dialogBody');
dialogBody.addEventListener('click', (event) => {
  event.stopPropagation();
});

const productDialogCloseBtn = document.getElementById('productDialogCloseBtn');
productDialogCloseBtn.addEventListener('click', () => {
  setCloseModal();
});

// FUNCTIONS
function setCloseModal() {
  const dialog = document.getElementById('productDialog');
  dialog.addEventListener('transitionend', closeModal);
  dialog.classList.remove('active');
}

function closeModal() {
  const dialog = document.getElementById('productDialog');
  dialog.removeEventListener('transitionend', closeModal);
  dialog.close();
}

function openProductDialog(product) {
  const dialog = document.querySelector('#productDialog');
  const dialogTitle = document.querySelector('#productDialogTitle');
  const dialogDescription = document.querySelector('#productDialogDescription');
  const productDialogImage = document.querySelector('#productDialogImage');
  const addOrderBtn = document.querySelector('#addOrderBtn');
  const productDialogQuantity = document.querySelector(
    '#productDialogQuantity'
  );

  dialogTitle.innerText = product.name;
  dialogDescription.innerText = product.description;
  productDialogImage.src = product.image;
  addOrderBtn.dataset.productId = product.id;
  addOrderBtn.dataset.quantity = productDialogQuantity.value;

  dialog.showModal();
  dialog.classList.add('active');
}

function showAssociatedTable() {
  const associatedTable = localStorage.getItem('associatedTable');

  if (associatedTable === null) return;

  document.querySelector('#tableInputWrapper').classList.toggle('active');
  document.querySelector('#associetedTable').innerText = associatedTable;
}

// API
const apiURL = 'https://64b70d31df0839c97e166026.mockapi.io/api';

async function getProducts() {
  try {
    const response = await fetch(`${apiURL}/products`);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function renderProducts(products) {
  const productsArea = document.querySelector(
    '.products-area-wrapper.gridView'
  );
  const dialogElement = productsArea.querySelector('#productDialog');

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
    <div class="product-cell">
      <span class="cell-label">Categoria:</span>
      ${product.category}
    </div>
    <div class="product-cell">
      <span class="cell-label">Preço:</span>
      R$ ${product.price.toFixed(2)}
    </div>
    <div class="product-cell">
      <button data-product-id="${
        product.id
      }" type="button" class="btn btn-modalshow">Adicionar</button>
    </div>
    `;

    productsArea.appendChild(productCard);
  });

  productsArea.appendChild(dialogElement);

  const addOrderButtons = document.querySelectorAll('.btn-modalshow');
  addOrderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      const product = products.find((p) => p.id === productId);

      openProductDialog(product);
    });
  });
}

async function filterProducts() {
  const products = await getProducts();
  const filter = document.querySelector('#filterProductInput').value;

  if (filter === 'all') {
    renderProducts(products);
    return products;
  }

  const filteredProducts = products.filter(
    (product) => product.category === filter
  );
  renderProducts(filteredProducts);

  return filteredProducts;
}

async function renderCategories(products) {
  const categories = products.map((product) => product.category);
  const uniqueCategories = [...new Set(categories)];

  const filterProductInput = document.querySelector('#filterProductInput');
  uniqueCategories.forEach((category) => {
    const option = document.createElement('option');

    option.value = category;
    option.innerText = category + 's';

    filterProductInput.appendChild(option);
  });
}

async function getProduct(id) {
  try {
    const response = await fetch(`${apiURL}/products/${id}`);
    const order = await response.json();
    return order;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getOrders() {
  try {
    const response = await fetch(`${apiURL}/orders`);
    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function postOrder(order) {
  try {
    const product = await getProduct(order.productId);

    const response = await fetch(`${apiURL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: product,
        quantity: order.quantity,
        status: 'pendente',
        total_price: product.price * order.quantity,
      }),
    });

    if (getOrders().length !== 0) document.querySelector('.list').click();
  } catch (error) {
    console.error(error);
    alert('Erro ao adicionar pedido');
  } finally {
    closeModal();
  }
}

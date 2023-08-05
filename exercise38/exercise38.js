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

  document.querySelector('#headerText').innerText = 'Produtos';
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

  document.querySelector('#headerText').innerText = 'Pedidos';
});

document.querySelector('.mode-switch').addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  document.querySelector('.mode-switch').classList.toggle('active');
});

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
  const orders = await getOrders();
  await filterProducts();
  await renderCategories(products);
  showAssociatedTable();
  renderOrders(orders);
});

document.addEventListener('click', async (event) => {
  const deleteBtn = event.target.closest('.delete-order-btn');
  if (deleteBtn) {
    const orderId = deleteBtn.dataset.orderId;
    await deleteOrder(orderId);
    const updatedOrders = await getOrders();
    renderOrders(updatedOrders);
  }
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

// DIALOG
document.querySelector('#productDialogQuantity').addEventListener('change', () => {
  const quantity = document.querySelector('#productDialogQuantity').value;
  document.querySelector('#addOrderBtn').dataset.quantity = quantity;
});

document.querySelector('#productDialog').addEventListener('click', () => {
  setCloseModal();
});

document.querySelector('#dialogBody').addEventListener('click', (event) => {
  event.stopPropagation();
});

document.getElementById('productDialogCloseBtn').addEventListener('click', () => {
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

    await fetch(`${apiURL}/orders`, {
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

    const orders = await getOrders();
    renderOrders(orders);
    if (orders.length === 1) document.querySelector('.list').click();
  } catch (error) {
    console.error(error);
    alert('Erro ao adicionar pedido');
  } finally {
    closeModal();
  }
}

function renderOrders(orders) {
  const ordersWrapper = document.querySelector('#ordersWrapper');

  ordersWrapper.innerHTML = '';

  if (orders.length === 0) {
    ordersWrapper.innerHTML = '<p>Nenhum pedido encontrado</p>';
    return;
  }

  orders.forEach((order) => {
    const orderCard = document.createElement('div');
    orderCard.classList.add('products-row');

    orderCard.innerHTML = `
    <div class="product-cell image">
      <img src="${order.product.image}" alt="product">
      <span>${order.product.name}</span>
    </div>
    <div class="product-cell status-cell">
      <span class="status active ${
        order.status === 'pendente' ? 'disabled' : null
      }">${order.status}</span>
    </div>
    <div class="product-cell sales">${order.quantity}</div>
    <div class="product-cell price">R$ ${order.total_price.toFixed(2)}</div>
    <div class="product-cell actions">
      <button class="btn delete-order-btn" data-order-id="${order.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </button>
    </div>
    `;

    ordersWrapper.appendChild(orderCard);
  });

  const ordersTotal = orders.reduce(
    (total, order) => total + order.total_price,
    0
  );

  const ordersTotalElement = document.querySelector('#totalPrice');
  ordersTotalElement.innerText = `R$ ${ordersTotal.toFixed(2)}`;
}

async function deleteOrder(id) {
  try {
    await fetch(`${apiURL}/orders/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
    alert('Erro ao deletar pedido');
  }
}

// EVENTS
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

document
  .querySelector('#productDialogStatus')
  .addEventListener('change', () => {
    const status = document.querySelector('#productDialogStatus').value;
    document.querySelector('#updateOrderBtn').dataset.status = status;
  });

document.querySelector('#productDialog').addEventListener('click', () => {
  setCloseModal();
});

document.querySelector('#dialogBody').addEventListener('click', (event) => {
  event.stopPropagation();
});

document
  .getElementById('productDialogCloseBtn')
  .addEventListener('click', () => {
    setCloseModal();
  });

document
  .getElementById('updateOrderBtn')
  .addEventListener('click', async (event) => {
    const orderId = event.target.dataset.orderId;
    const status = event.target.dataset.status;

    await updateOrderStatus(orderId, status);
    setCloseModal();

    renderOrders(await getOrders());
  });

document.addEventListener('DOMContentLoaded', async () => {
  const orders = await getOrders();
  renderOrders(orders);
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

function openOrderDialog(order) {
  const dialogElement = document.querySelector('#productDialog');
  const dialogTitle = document.querySelector('#productDialogTitle');
  const productDialogStatus = document.querySelector('#productDialogStatus');
  const updateOrderBtn = document.querySelector('#updateOrderBtn');

  dialogTitle.textContent = order.product.name;
  productDialogStatus.value = order.status;
  updateOrderBtn.dataset.orderId = order.id;
  updateOrderBtn.dataset.status = order.status;

  dialogElement.showModal();
  dialogElement.classList.add('active');
}

// API
const apiURL = 'https://64b70d31df0839c97e166026.mockapi.io/api';

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
    <div class="product-cell actions">
      <button class="btn edit-status-btn" data-order-id="${order.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 24 24">
          <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/>
        </svg>
      </button>
    </div>
    `;

    ordersWrapper.appendChild(orderCard);
  });

  const editStatusBtns = document.querySelectorAll('.edit-status-btn');
  editStatusBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const orderId = btn.dataset.orderId;
      const order = orders.find((order) => order.id === orderId);
      openOrderDialog(order);
    });
  });
}

async function updateOrderStatus(orderId, status) {
  try {
    const response = await fetch(`${apiURL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    const order = await response.json();
    return order;
  } catch (error) {
    console.error(error);
  }
}

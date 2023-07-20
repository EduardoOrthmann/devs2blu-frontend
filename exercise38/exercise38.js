const sidebarLinks = document.querySelectorAll('.sidebar-link');

sidebarLinks.forEach((link) => {
  link.addEventListener('click', () => {
    sidebarLinks.forEach((link) => {
      link.classList.remove('is-active');
    });
    link.classList.add('is-active');
  });
});

window.addEventListener('resize', () => {
  const sidebar = document.querySelector('.sidebar');
  if (window.innerWidth > 1090) {
    sidebar.classList.remove('collapse');
  } else {
    sidebar.classList.add('collapse');
  }
});

const discover = document.querySelector('.discover');
const mainContainer = document.querySelector('.main-container');
const trending = document.querySelector('.trending');

discover.addEventListener('click', () => {
  mainContainer.classList.remove('show');
  mainContainer.scrollTop = 0;
});

trending.addEventListener('click', () => {
  mainContainer.classList.add('show');
  mainContainer.scrollTop = 0;
  sidebarLinks.forEach((link) => {
    link.classList.remove('is-active');
  });
  trending.classList.add('is-active');
});



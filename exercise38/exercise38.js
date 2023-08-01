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
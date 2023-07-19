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

const logo = document.querySelector('.logo');
const logoExpand = document.querySelector('.logo-expand');
const discover = document.querySelector('.discover');
const mainContainer = document.querySelector('.main-container');
const trending = document.querySelector('.trending');
const video = document.querySelector('.video');
const videoStream = document.querySelector('.video-stream');
const videoName = document.querySelector('.video-name');
const videoBy = document.querySelector('.video-by');
const authorImg = document.querySelector('.author-img');
const videoPTitle = document.querySelector('.video-p-title');
const videoPName = document.querySelector('.video-p-name');
const videoDetail = document.querySelector('.video-detail');

logo.addEventListener('click', () => {
  mainContainer.classList.remove('show');
  mainContainer.scrollTop = 0;
});

logoExpand.addEventListener('click', () => {
  mainContainer.classList.remove('show');
  mainContainer.scrollTop = 0;
});

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

video.addEventListener('click', () => {
  mainContainer.classList.add('show');
  mainContainer.scrollTop = 0;
  sidebarLinks.forEach((link) => {
    link.classList.remove('is-active');
  });
  trending.classList.add('is-active');
});

video.addEventListener('click', () => {
  const source = video.querySelector('source').getAttribute('src');
  const title = video.querySelector('.video-name').textContent;
  const person = video.querySelector('.video-by').textContent;
  const img = video.querySelector('.author-img').getAttribute('src');
  videoStream.pause();
  videoStream.querySelector('source').setAttribute('src', source);
  videoStream.load();
  videoPTitle.textContent = title;
  videoPName.textContent = person;
  authorImg.setAttribute('src', img);
});

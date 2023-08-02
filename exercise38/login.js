const modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    modeSwitch.classList.toggle('active');
});
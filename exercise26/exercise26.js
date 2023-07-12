const result = document.querySelector('#result');

for (let i = 1; i <= 20; i++) {
  if (i % 3 === 0) {
    const p = document.createElement('p');
    p.innerHTML = i;
    result.appendChild(p);
  }
}
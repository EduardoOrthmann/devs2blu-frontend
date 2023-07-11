const result = document.getElementById('result');

for (let i = 1; i < 10; i++) {
  if (i % 2 === 0) {
    const element = document.createElement('p');
    element.innerText = i;

    result.appendChild(element);
  }
}
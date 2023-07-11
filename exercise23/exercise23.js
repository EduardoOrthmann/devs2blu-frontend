const result = document.getElementById('result');

for (let i = 10; i >= 1; i--) {
  const element = document.createElement('p');
  element.innerText = i;

  result.appendChild(element);
}
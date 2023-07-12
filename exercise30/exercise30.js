const result = document.querySelector('#result');

let a = 0;
let b = 1;
let c = 0;

for (let i = 0; i < 10; i++) {
  c = a + b;
  a = b;
  b = c;
  const p = document.createElement('p');
  p.innerHTML = c;
  result.appendChild(p);
}

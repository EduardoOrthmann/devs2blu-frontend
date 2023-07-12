const result = document.querySelector('#result');

const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

for (const number of numbers) {
  const p = document.createElement('p');

  if (number === 1) {
    p.innerHTML = number;
    result.appendChild(p);
    continue;
  }

  let isPrime = true;

  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      isPrime = false;
      break;
    }
  }

  if (isPrime) {
    p.innerHTML = number;
    result.appendChild(p);
  }
}
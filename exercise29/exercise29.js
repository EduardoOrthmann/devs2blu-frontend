const result = document.querySelector('#result');

const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

result.innerHTML = numbers.reduce((acc, curr) => acc + curr);

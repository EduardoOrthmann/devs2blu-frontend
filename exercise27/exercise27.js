const result = document.querySelector('#result');

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

result.innerHTML = numbers.reduce((acc, curr) => acc + curr) / numbers.length;
const result = document.querySelector('#result');

const numbers = prompt('Digite uma lista de números inteiros separados por vírgula:').split(',').map(Number);

result.innerHTML = Math.max(...numbers);
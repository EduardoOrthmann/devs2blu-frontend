const result = document.querySelector('#result');

const numbers = Array.from({ length: 50 }, (_, i) => i + 1);

result.innerHTML = numbers.reduce((acc, curr) => {
  if (curr % 2 === 0) {
    return acc + curr;
  }

  return acc;
});

const result = document.querySelector('#result');

function countLetterA(event) {
  event.preventDefault();

  const str = document.querySelector('#str').value;

  const count = str.split('').reduce((acc, curr) => {
    if (curr.toUpperCase() === 'a'.toUpperCase()) {
      acc += 1;
    }

    return acc;
  }, 0);

  result.innerHTML = `A quantidade de letras "a" é ${count}`;
}

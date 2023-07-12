const tip = document.querySelector('#tip');
const randomNumber = Math.floor(Math.random() * 100) + 1;

function guessingGame(event) {
  event.preventDefault();
  
  const number = Number(document.querySelector('#number').value);

  console.log(randomNumber);
  if (number > randomNumber) {
    tip.innerHTML = 'O número é menor';
  } else if (number < randomNumber) {
    tip.innerHTML = 'O número é maior';
  } else {
    tip.innerHTML = 'Você acertou';
  }
}


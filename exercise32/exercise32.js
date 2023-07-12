const result = document.querySelector('#result');

function validadePassword(event) {
  event.preventDefault();

  const password = document.querySelector('#password').value;

  if (password === '1234') {
    result.innerHTML = 'Senha correta!';
  } else {
    result.innerHTML = 'Senha incorreta!';
  }
}
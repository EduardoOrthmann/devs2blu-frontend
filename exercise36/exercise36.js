const cep = document.querySelector('#cep');
const street = document.querySelector('#street');
const complement = document.querySelector('#complement');
const neighborhood = document.querySelector('#neighborhood');
const city = document.querySelector('#city');
const state = document.querySelector('#state');

cep.addEventListener('input', (event) => {
  event.preventDefault();

  const cepValue = cep.value;

  if (cepValue.length === 5) {
    cep.value += '-';
  }
});

cep.addEventListener('blur', (event) => {
  event.preventDefault();

  const cepValue = cep.value.replace('-', '');

  if (cepValue.length === 8) {
    fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
      .then((response) => response.json())
      .then((data) => {
        street.value = data.logradouro;
        complement.value = data.complemento;
        neighborhood.value = data.bairro;
        city.value = data.localidade;
        state.value = data.uf;
      });
  }
});

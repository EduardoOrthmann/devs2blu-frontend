const countries = document.querySelector('#countries');

document.body.onload = () => {
  fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((country) => {
        const option = document.createElement('option');
        option.value = country.name.common;
        option.innerText = country.name.common;
        countries.appendChild(option);
      });
    });
};

countries.addEventListener('change', (event) => {
  event.preventDefault();

  const countryName = countries.value;

  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => response.json())
    .then((data) => {
      const country = data[0];

      const countryName = document.querySelector('#name');
      const countryCapital = document.querySelector('#capital');
      const countryRegion = document.querySelector('#region');
      const countrySubregion = document.querySelector('#subregion');
      const countryPopulation = document.querySelector('#population');
      const countryArea = document.querySelector('#area');
      const countryBorders = document.querySelector('#borders');
      const countryLanguages = document.querySelector('#languages');
      const countryCurrencies = document.querySelector('#currencies');
      const countryFlag = document.querySelector('#flag');

      countryName.innerText = country.name.common;
      countryCapital.innerText = country.capital;
      countryRegion.innerText = country.region;
      countrySubregion.innerText = country.subregion;
      countryPopulation.innerText = country.population;
      countryArea.innerText = country.area;

      countryBorders.innerText = country.borders ? country.borders.join(', ') : 'Sem fronteiras';
      countryLanguages.innerText = Object.values(country.languages).join(', ');
      countryFlag.src = country.flags.png;
    });
});

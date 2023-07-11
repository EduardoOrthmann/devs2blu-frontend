function convertToFahrenheit(event) {
  event.preventDefault();

  const celcius = parseInt(document.getElementById("celcius").value);

  const convertedValue = (celcius * 9 /5) + 32;

  document.getElementById("result").innerHTML = `${celcius} celcius convertido para Fahrenheit é: ${convertedValue}`;
}
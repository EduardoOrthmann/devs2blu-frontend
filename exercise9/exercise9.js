function calculateIMC(event) {
  event.preventDefault();

  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);

  const imc = weight / (height * height);

  document.getElementById("result").innerHTML = `o imc é igual a: ${imc.toFixed(2)}`;
}
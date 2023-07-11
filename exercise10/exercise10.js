function convertToTime(event) {
  event.preventDefault();

  const number = parseInt(document.getElementById("number").value);

  const minutes = number * 60;

  document.getElementById("result").innerHTML = `o número é igual a: ${minutes} minutos`;
}
function discount(event) {
  event.preventDefault();

  const number = document.getElementById("number").value;

  const result = number - (number * 0.1);

  document.getElementById("result").innerHTML = result;
}
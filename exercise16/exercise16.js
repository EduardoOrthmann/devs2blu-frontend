function evenOrOdd(event) {
  event.preventDefault();

  const number = document.getElementById("number").value;

  const result = number % 2 === 0 ? "par" : "impar";

  document.getElementById("result").innerHTML = result;
}
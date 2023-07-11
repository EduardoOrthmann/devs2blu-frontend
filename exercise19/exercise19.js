function yearToDays(event) {
  event.preventDefault();

  const number = document.getElementById("number").value;

  const result = number * 365;

  document.getElementById("result").innerHTML = result;
}
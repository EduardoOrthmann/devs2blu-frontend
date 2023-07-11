function yearToDays(event) {
  event.preventDefault();

  let number = document.getElementById("number").value;

  number = number.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');

  document.getElementById("result").innerHTML = number;
}
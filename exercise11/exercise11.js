function concatName(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;

  const result = `${name} ${surname}`;

  document.getElementById("result").innerHTML = result;
}
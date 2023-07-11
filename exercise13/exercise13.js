function uppercase(event) {
  event.preventDefault();

  const str = document.getElementById("str").value;

  const result = str.toUpperCase();

  document.getElementById("result").innerHTML = result;
}
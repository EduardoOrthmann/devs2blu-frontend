function getSubstr(event) {
  event.preventDefault();

  const str = document.getElementById("str").value;

  const result = str.substr(0, 3);

  document.getElementById("result").innerHTML = result;
}
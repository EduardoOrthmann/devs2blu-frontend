function countStrLength(event) {
  event.preventDefault();

  const str = document.getElementById("str").value;

  const result = str.length;

  document.getElementById("result").innerHTML = result;
}
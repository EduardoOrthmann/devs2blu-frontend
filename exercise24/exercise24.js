function searchLetterA(event) {
  event.preventDefault();

  const str = document.getElementById("str").value;

  const result = str.search("a") !== -1 ? "contém a letra a" : "não contém a letra a";

  document.getElementById("result").innerHTML = result;
}
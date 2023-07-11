function updateStr(event) {
  event.preventDefault();

  let str = document.getElementById("str").value;
 
  str = str.replaceAll("A", "4");
  str = str.replaceAll("I", "1");
  str = str.replaceAll("E", "3");
  str = str.replaceAll("O", "0");
  str = str.replaceAll("S", "5");

  document.getElementById("result").innerHTML = str;
}
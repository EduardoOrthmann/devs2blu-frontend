function average(event) {
  event.preventDefault();

  const grade1 = parseFloat(document.getElementById("grade1").value);
  const grade2 = parseFloat(document.getElementById("grade2").value);
  const grade3 = parseFloat(document.getElementById("grade3").value);

  if (grade1 < 0 || grade1 > 10 || grade2 < 0 || grade2 > 10 || grade3 < 0 || grade3 > 10) {
    alert("o número n pode ser acima de 10 ou menor q 0");
    return;
  }

  const result = (grade1 + grade2 + grade3) / 3;

  document.getElementById("result").innerHTML = result.toFixed(2);
}
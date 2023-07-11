function average(event) {
  event.preventDefault();

  const grade1 = parseFloat(document.getElementById("grade1").value);
  const grade2 = parseFloat(document.getElementById("grade2").value);
  const grade3 = parseFloat(document.getElementById("grade3").value);

  const average = (grade1 + grade2 + grade3) / 3;

  document.getElementById("result").innerHTML = "Média: " + average.toFixed(2);
}
function calculateRectangleArea(event) {
  event.preventDefault();

  const height = parseFloat(document.getElementById("height").value);
  const width = parseFloat(document.getElementById("width").value);

  const area = height * width;

  document.getElementById("result").innerHTML = `a área é igual a: ${area}`;
}
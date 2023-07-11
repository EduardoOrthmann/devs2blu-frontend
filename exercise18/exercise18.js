function prime(event) {
  event.preventDefault();

  const number = document.getElementById("number").value;
  let result = "primo";

  if (number >= 1) {
    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        result = "não primo";
        break;
      }
    }
  } else {
    result = "não primo";
  }


  document.getElementById("result").innerHTML = result;
}
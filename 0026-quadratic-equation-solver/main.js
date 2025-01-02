const first_operation = (a, b, c) => {
  return b ** 2 - 4 * a * c;
};

const second_operation = (a, b, c) => {
  const action_value = first_operation(a, b, c);

  if (action_value < 0) {
    return null;
  } else {
    const x1 = (-b + Math.sqrt(action_value)) / (2 * a);
    const x2 = (-b - Math.sqrt(action_value)) / (2 * a);
    return [x1, x2];
  }
};

function quadratic_equation() {
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const c = parseFloat(document.getElementById("c").value);
  const result = second_operation(a, b, c);

  const resultDiv = document.getElementById("result");

  if (result) {
    const [plus, minus] = result;
    resultDiv.textContent = `The solutions of x are ${plus.toFixed(
      2
    )} or ${minus.toFixed(2)}.`;
    resultDiv.className = "mt-6 text-green-600 font-semibold text-center";
  } else {
    resultDiv.textContent = "The solutions of x are undefined.";
    resultDiv.className = "mt-6 text-red-600 font-semibold text-center";
  }

  document.getElementById("a").value = "";
  document.getElementById("b").value = "";
  document.getElementById("c").value = "";
}

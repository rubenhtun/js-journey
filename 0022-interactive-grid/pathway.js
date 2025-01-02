const gridContainer = document.getElementById("grid-container");

for (let i = 0; i < 200; i++) {
  // cell ကွက်တစ်ခုကို ဖန်တီးပါသည်။
  const cell = document.createElement("div");
  cell.classList = "grid-cell";
  cell.textContent = i + 1;
  gridContainer.appendChild(cell);

  cell.addEventListener("click", () => {
    if (cell.innerText === "✔") {
      cell.textContent = i + 1;
      cell.style.background = "linear-gradient(145deg, #6a11cb, #2575fc)";
    } else {
      cell.style.background = "linear-gradient(145deg, yellow, green)";
      cell.textContent = "✔";
    }
  });
}

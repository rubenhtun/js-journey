const pswDisplay = document.querySelector("#password");
const cBtn = document.querySelector("#copyBtn");
const uCase = document.querySelector("#includeUppercase");
const lCase = document.querySelector("#includeLowercase");
const num = document.querySelector("#includeNumbers");
const sym = document.querySelector("#includeSymbols");
const gBtn = document.querySelector("#generateBtn");
const sMsg = document.querySelector("#successMessage");

const lChars = "abcdefghijklmnopqrstuvwxyz";
const uChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nChars = "0123456789";
const sChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

gBtn.addEventListener("click", () => {
  let chars = "psw@generator";
  if (lCase.checked) chars += lChars;
  if (uCase.checked) chars += uChars;
  if (num.checked) chars += nChars;
  if (sym.checked) chars += sChars;

  let pswL = parseInt(document.getElementById("length").value);
  let psw = "";
  for (let i = 0; i < pswL; i++) {
    let randomChar = Math.floor(Math.random() * chars.length);
    psw += chars[randomChar];
  }
  pswDisplay.value = psw;
});

cBtn.addEventListener("click", () => {
  if (pswDisplay.value) {
    navigator.clipboard.writeText(pswDisplay.value);
    sMsg.classList.remove("hidden");
    setTimeout(() => {
      sMsg.classList.add("hidden");
    }, 2000);
  }
});

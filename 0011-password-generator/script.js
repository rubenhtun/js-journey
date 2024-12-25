// manipulate DOM elements with querySelector
const pswDisplay = document.querySelector("#password");
const cBtn = document.querySelector("#copyBtn");
const uCase = document.querySelector("#includeUppercase");
const lCase = document.querySelector("#includeLowercase");
const num = document.querySelector("#includeNumbers");
const sym = document.querySelector("#includeSymbols");
const gBtn = document.querySelector("#generateBtn");
const sMsg = document.querySelector("#successMessage");

const lChars = "abcdefghijklmnopqrstuvwxyz"; // lowercase letters
const uChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // uppercase letters
const nChars = "0123456789"; // numbers
const sChars = "!@#$%^&*()_+~`|}{[]:;?><,./-="; // characters || symbols

gBtn.addEventListener("click", () => {
  let chars = ""; // to store all psw characters
  console.log(chars);
  if (lCase.checked) chars += lChars; // add lowercase
  if (uCase.checked) chars += uChars; // add uppercase
  if (num.checked) chars += nChars; // add numbers
  if (sym.checked) chars += sChars; // add symbols

  let pswLen = parseInt(document.getElementById("length").value); // get password length
  let psw = ""; // initialize password
  for (let i = 0; i < pswLen; i++) {
    // loop through password length
    let randomChar = Math.floor(Math.random() * chars.length); // generate random index
    psw += chars[randomChar]; // add random character to password list
  }
  pswDisplay.value = psw;
});

// copy psw after generating
cBtn.addEventListener("click", () => {
  if (pswDisplay.value) {
    navigator.clipboard.writeText(pswDisplay.value);
    sMsg.classList.remove("hidden");
    setTimeout(() => {
      sMsg.classList.add("hidden");
    }, 2000);
  }
});

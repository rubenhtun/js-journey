document.getElementById("qr-text").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    generateQrCode();
  }
});

generateQrCode = () => {
  let qrText = document.getElementById("qr-text").value;
  let qrCode = document.getElementById("qr-code");
  qrCode.innerHTML = "";

  if (qrText.trim() === "") {
    alert("Please enter a text to generate QR code");
  } else {
    new QRCode(qrCode, {
      text: qrText,
      width: 200,
      height: 200,
      colorDark: "#000000",
    });
  }
};

const imageFile = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const grayscaleAdjust = document.getElementById("grayscale");
const blurAdjust = document.getElementById("blur");
const brightnessAdjust = document.getElementById("brightness");
const contrastAdjust = document.getElementById("contrast");
const resetButton = document.getElementById("resetButton");

// Adjust image properties
const adjustImage = () => {
  const grayscale = grayscaleAdjust.value;
  const blur = blurAdjust.value;
  const brightness = brightnessAdjust.value;
  const contrast = contrastAdjust.value;

  previewImage.style.filter = `grayscale(${grayscale}%) blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`;
};

// Get accessed file when user uploads an image
imageFile.addEventListener("change", (e) => {
  const image = e.target.files[0];
  if (!image) return; // if no file is selected

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    previewImage.src = reader.result;
    previewImage.classList.remove("hidden");
  });

  reader.readAsDataURL(image);
});

// Add event listeners to adjustors
grayscaleAdjust.addEventListener("input", adjustImage);
blurAdjust.addEventListener("input", adjustImage);
brightnessAdjust.addEventListener("input", adjustImage);
contrastAdjust.addEventListener("input", adjustImage);

// Reset filters to the initial state
resetButton.addEventListener("click", () => {
  grayscaleAdjust.value = 0;
  blurAdjust.value = 0;
  brightnessAdjust.value = 100;
  contrastAdjust.value = 100;

  previewImage.style.filter = "none";
});

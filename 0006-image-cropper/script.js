// Select DOM elements for file upload, image display, output, and buttons
const fileUpload = document.getElementById("fileUpload");
const image = document.getElementById("image");
const output = document.getElementById("output");
const btnCrop = document.getElementById("btn-crop");
const aspectRatioSelect = document.getElementById("aspectRatio");
const downloadBtn = document.querySelector(".download-btn");
const hide = document.getElementById("hide");
let cropper;

// Handle file upload and initialize image cropping
fileUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      image.src = reader.result;
      image.style.display = "block";
      btnCrop.style.display = "inline-block";
      initializeCropper();
    };
    reader.readAsDataURL(file);
  }
});

// Initialize Cropper.js with default settings
function initializeCropper() {
  if (cropper) {
    cropper.destroy(); // Destroy existing cropper instance to avoid conflicts
  }
  cropper = new Cropper(image, {
    aspectRatio: 1, // Default to 1:1 aspect ratio
    viewMode: 1, // Restrict crop box to image boundaries
    autoCropArea: 1, // Automatically crop the entire image
    movable: true, // Allow moving the image
    zoomable: true, // Allow zooming
    scalable: false, // Disable scaling
    cropBoxResizable: true, // Allow resizing the crop box
  });
}

// Update cropper aspect ratio based on user selection
aspectRatioSelect.addEventListener("change", () => {
  const selectedRatio = aspectRatioSelect.value;
  cropper.setAspectRatio(selectedRatio === "free" ? NaN : eval(selectedRatio));
});

// Crop the image and display the result
btnCrop.addEventListener("click", () => {
  const canvas = cropper.getCroppedCanvas();
  output.src = canvas.toDataURL("image/png");
  downloadBtn.style.display = "block";
  hide.style.display = "none"; // Hide placeholder or unnecessary elements
});

// Download the cropped image
downloadBtn.addEventListener("click", () => {
  const downloadLink = document.createElement("a");
  downloadLink.href = output.src;
  downloadLink.download = "cropped-image.png";
  downloadLink.click();
});

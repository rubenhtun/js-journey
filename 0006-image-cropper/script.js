const fileUpload = document.getElementById("fileUpload");
const image = document.getElementById("image");
const output = document.getElementById("output");
const btnCrop = document.getElementById("btn-crop");
const aspectRatioSelect = document.getElementById("aspectRatio");
const downloadBtn = document.querySelector(".download-btn");
const hide = document.getElementById("hide");
let cropper;

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

function initializeCropper() {
  if (cropper) {
    cropper.destroy();
  }
  cropper = new Cropper(image, {
    aspectRatio: 1,
    viewMode: 1,
    autoCropArea: 1,
    movable: true,
    zoomable: true,
    scalable: false,
    cropBoxResizable: true,
  });
}

aspectRatioSelect.addEventListener("change", () => {
  const selectedRatio = aspectRatioSelect.value;
  cropper.setAspectRatio(selectedRatio === "free" ? NaN : eval(selectedRatio));
});

btnCrop.addEventListener("click", () => {
  const canvas = cropper.getCroppedCanvas();
  output.src = canvas.toDataURL("image/png");
  downloadBtn.style.display = "block";
  hide.style.display = "none";
});

downloadBtn.addEventListener("click", () => {
  const downloadLink = document.createElement("a");
  downloadLink.href = output.src;
  downloadLink.download = "cropped-image.png";
  downloadLink.click();
});

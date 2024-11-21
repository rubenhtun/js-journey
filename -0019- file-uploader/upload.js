const uploadForm = document.getElementById("upload-form");

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("file-input");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file to upload.");
    return;
  } else {
    const fileList = document.getElementById("file-list");
    const ul = document.createElement("ul");
    const li = document.createElement("li");

    const fileNameSpan = document.createElement("span");
    const fileSizeSpan = document.createElement("span");

    fileNameSpan.textContent = file.name;
    fileSizeSpan.textContent = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

    li.appendChild(fileNameSpan);
    li.appendChild(fileSizeSpan);
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    console.log(li);
    ul.appendChild(li);
    fileList.appendChild(ul);
    fileInput.value = "";
    console.log(fileList);
  }
});

// js ကို ဤနည်းဖြင့်ရေးခြင်းသည် မှန်ကန်သော နည်းလမ်းမဟုတ်ပါ။
// ul, li ကို ထပ်ခါ ဖန်တီးယူနေပါလိမ့်မည်။

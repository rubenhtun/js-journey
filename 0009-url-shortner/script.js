const urlForm = document.getElementById("urlForm");
const resultDisplay = document.getElementById("result");
const shortUrlTextValue = document.getElementById("shortUrl");

// when we click "Shorten URL" button, we will listen urlForm with addEventListener
urlForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // to stop the default behavior of form submission
  const longUrl = document.getElementById("longUrl").value.trim();

  if (!longUrl) {
    alert("Please enter a URL");
    return;
  }

  // since we use async function
  try {
    // Using the tinyurl API
    const response = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    );
    if (!response.ok) throw new Error("Failed to shorten URL!");

    const shortenUrl = await response.text();
    resultDisplay.classList.remove("hidden"); // show the result
    shortUrlTextValue.value = shortenUrl;
  } catch (err) {
    alert("Error: " + err.message);
  }
});

const copyToClipboard = () => {
  shortUrlTextValue.select(); // To select the shorten url text of the input element
  // copy the url link address on the clipboard
  document.execCommand("copy");

  const copyUrlBtn = document.querySelector(".copyUrlBtn");
  copyUrlBtn.textContent = "!Copied";
  setTimeout(() => {
    copyUrlBtn.textContent = "Copy"; // change to the original text
  }, 2000);
};

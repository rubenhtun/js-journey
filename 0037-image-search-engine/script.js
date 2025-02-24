async function searchImages() {
  const query = document.getElementById("search-input").value;
  const resultsContainer = document.getElementById("image-results");
  resultsContainer.innerHTML = "";

  if (query.trim() === "") {
    alert("Please enter a search term");
    return;
  }

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=xKLwAFHBeU-A37eHENdQYJUAAe7Z_7BOs54aWebF2j0`
  );
  const data = await response.json();

  data.results.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description;
    imgElement.classList.add("rounded-lg", "shadow-md", "w-full");
    resultsContainer.appendChild(imgElement);
  });
}

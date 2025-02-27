const search = document.getElementById("search-input");

search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchImage();
  }
});

const searchImage = async () => {
  const query = search.value;
  const resultedImagesList = document.getElementById("resulted-images-list");

  if (query.trim() === "") {
    alert("Please enter a search term");
    return;
  }

  // Fetching data from unsplash API
  const response = await fetch(
    "https://api.unsplash.com/search/photos?query=" +
      query +
      "&client_id=xKLwAFHBeU-A37eHENdQYJUAAe7Z_7BOs54aWebF2j0"
  );

  const images = await response.json();

  images.results.forEach((image) => {
    const imageCardElement = document.createElement("img");
    imageCardElement.src = image.urls.small;
    imageCardElement.alt = image.alt_description;
    imageCardElement.classList.add("rounded-lg", "shadow-md", "w-full");
    resultedImagesList.appendChild(imageCardElement);
  });
};

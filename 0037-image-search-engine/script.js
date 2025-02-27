// Get the search input element
const search = document.getElementById("search-input");

// Listen for "Enter" key press to trigger search
search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchImage();
  }
});

// Function to search and display images
const searchImage = async () => {
  const query = search.value;
  const resultedImagesList = document.getElementById("resulted-images-list");

  // Check if search query is empty
  if (query.trim() === "") {
    alert("Please enter a search term");
    return;
  }

  // Fetch images from Unsplash API
  const response = await fetch(
    "https://api.unsplash.com/search/photos?query=" + query + "&client_id=" // Replace with your Unsplash API key
  );

  const images = await response.json();

  // Display each image in the results
  images.results.forEach((image) => {
    const imageCardElement = document.createElement("img");
    imageCardElement.src = image.urls.small; // Use small-sized image
    imageCardElement.alt = image.alt_description; // Add alt text for accessibility
    imageCardElement.classList.add(
      "rounded-lg",
      "shadow-md",
      "w-full",
      "cursor-pointer"
    ), // Add classes for styling
      resultedImagesList.appendChild(imageCardElement); // Add image to the resulted images list
  });
};

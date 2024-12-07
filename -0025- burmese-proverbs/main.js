window.onload = () => {
  displayEachProverb();
};

const proverbContainer = document.getElementById("proverb-container");

const displayEachProverb = async () => {
  try {
    const response = await fetch("hundred-burmese-proverbs.json");
    const data = await response.json();

    data.forEach((proverb) => {
      const proverbDiv = document.createElement("div");
      proverbDiv.classList.add("proverb");

      const proverbContent = document.createElement("p");
      proverbContent.innerHTML = `<strong>Proverb:</strong> ${proverb.proverb}`;
      proverbDiv.appendChild(proverbContent);

      const proverbTranslation = document.createElement("p");
      proverbTranslation.innerHTML = `<strong>Translation:</strong> ${proverb.translation}`;
      proverbDiv.appendChild(proverbTranslation);

      proverbContainer.appendChild(proverbDiv);
    });
  } catch (err) {
    console.error(err.message);
    alert(err.message);
  }
};

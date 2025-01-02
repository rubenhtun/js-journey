window.onload = () => {
  displayEachProverb();
};

const proverbContainer = document.getElementById("proverb-container");

// async function
const displayEachProverb = async () => {
  try {
    const response = await fetch("hundred-burmese-proverbs.json"); // json file data ကို fetch လုပ်
    const data = await response.json();

    // forEach ကို သုံးပြီး proverb တစ်ခုစီကို ပြသပါမည်။
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
    // error ဖြစ်ခဲ့သည်ရှိသော်
    console.error(err.message);
    alert(err.message);
  }
};

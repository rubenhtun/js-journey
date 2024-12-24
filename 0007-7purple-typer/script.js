const textList = [
  "The sun rose gently over the horizon, casting a warm golden glow on the quiet town below. Birds chirped as the first rays touched the rooftops, waking the world from its slumber. The day promised to be peaceful and bright.",
  "Technology has transformed the way we live, work, and communicate. With the click of a button, we can connect with anyone around the globe, share ideas, and collaborate in real time. This digital age has brought the world closer together.",
  "A healthy lifestyle includes a balanced diet, regular exercise, and adequate rest. These habits not only improve physical health but also boost mental well-being. Consistency is the key to lasting results.",
  "In the depths of the forest, a gentle stream winds its way through the trees. The sound of flowing water and rustling leaves creates a soothing atmosphere. Nature is a peaceful retreat from the busy world.",
  "Learning a new language opens doors to different cultures and experiences. It challenges the mind and provides a unique way to connect with people from diverse backgrounds. Every word learned is a step toward understanding.",
  "The ocean waves crashed against the shore, leaving trails of foam on the sand. Seagulls called out as they glided above, riding the wind. The beach is a place where many find tranquility and escape.",
  "Books have the power to transport us to other worlds. Through stories, we experience adventures, face challenges, and learn valuable lessons. Every book holds a universe waiting to be explored.",
];

const textDis = document.querySelector("#text-to-type");
const typingInput = document.querySelector("#typing-input");
const startBtn = document.querySelector("#start-button");
const speedDisplay = document.querySelector("#speed");
const accuracyDisplay = document.querySelector("#accuracy");

// Function to display the text in individual spans
const displayText = (randomText) => {
  textDis.innerHTML = "";
  randomText.split(" ").forEach((word) => {
    const wordElement = document.createElement("span");
    wordElement.textContent = word + " ";
    textDis.appendChild(wordElement);
  });
};

// Call this initially to display the first paragraph
displayText(textList[0]);

// Input event listener to track typing and calculate accuracy
typingInput.addEventListener("input", () => {
  const typedWords = typingInput.value.trim().split(" ");
  const displayedWords = textDis.innerText.trim().split(" ");
  const words = textDis.querySelectorAll("span");

  words.forEach((word, i) => {
    if (typedWords[i] === displayedWords[i]) {
      word.style.color = "purple";
    } else if (typedWords[i]) {
      word.style.color = "red";
    } else {
      word.style.color = "black";
    }
  });
});

// Start button click event to begin timing and display text
startBtn.addEventListener("click", () => {
  const randomParagraphText =
    textList[Math.floor(Math.random() * textList.length)];
  displayText(randomParagraphText);
  typingInput.value = "";
});

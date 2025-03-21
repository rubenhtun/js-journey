// ======= Text Data =======
const textList = [
  "The sun rose gently over the horizon, casting a warm golden glow on the quiet town below. Birds chirped as the first rays touched the rooftops, waking the world from its slumber. The day promised to be peaceful and bright.",
  "Technology has transformed the way we live, work, and communicate. With the click of a button, we can connect with anyone around the globe, share ideas, and collaborate in real time. This digital age has brought the world closer together.",
  "A healthy lifestyle includes a balanced diet, regular exercise, and adequate rest. These habits not only improve physical health but also boost mental well-being. Consistency is the key to lasting results.",
  "In the depths of the forest, a gentle stream winds its way through the trees. The sound of flowing water and rustling leaves creates a soothing atmosphere. Nature is a peaceful retreat from the busy world.",
  "Learning a new language opens doors to different cultures and experiences. It challenges the mind and provides a unique way to connect with people from diverse backgrounds. Every word learned is a step toward understanding.",
  "The ocean waves crashed against the shore, leaving trails of foam on the sand. Seagulls called out as they glided above, riding the wind. The beach is a place where many find tranquility and escape.",
  "Books have the power to transport us to other worlds. Through stories, we experience adventures, face challenges, and learn valuable lessons. Every book holds a universe waiting to be explored.",
];

// ======= DOM Element References =======
const textDis = document.querySelector("#text-to-type");
const typingInput = document.querySelector("#typing-input");
const restartBtn = document.querySelector("#restart-button");
const speedDisplay = document.querySelector("#speed");
const accuracyDisplay = document.querySelector("#accuracy");

// ======= Function to Display Text Paragraph in Spans =======
const displayText = (randomText) => {
  textDis.innerHTML = ""; // Clear previous text
  randomText.split(" ").forEach((word) => {
    const wordElement = document.createElement("span");
    wordElement.textContent = word + " "; // Add space after each word
    textDis.appendChild(wordElement);
  });
};

// ======= Function to Display a Random Paragraph =======
const displayRandomText = () => {
  const randomParagraphText =
    textList[Math.floor(Math.random() * textList.length)];
  displayText(randomParagraphText);
  typingInput.value = ""; // Clear input field
  typingInput.focus(); // Focus on input for better UX
};

// ======= Initial Paragraph Display =======
displayText(textList[0]);

// ======= Input Event Listener: Track Typing & Color Words =======
typingInput.addEventListener("input", () => {
  const typedWords = typingInput.value.trim().split(" ");
  const displayedWords = textDis.innerText.trim().split(" ");
  const words = textDis.querySelectorAll("span");

  // Check each typed word against displayed word
  words.forEach((word, i) => {
    if (typedWords[i] === displayedWords[i]) {
      word.style.color = "purple"; // Correct word
    } else if (typedWords[i]) {
      word.style.color = "red"; // Incorrect word
    } else {
      word.style.color = "black"; // Untyped word
    }
  });

  // ======= Check if All Words Typed Correctly to Display New Paragraph =======
  if (
    typedWords[typedWords.length - 1] ===
    words[words.length - 1].innerText.trim()
  ) {
    displayRandomText();
  }
});

// ======= Restart Button Event: Display Random Paragraph =======
restartBtn.addEventListener("click", () => {
  displayRandomText();
  typingInput.value = ""; // Clear input field
});

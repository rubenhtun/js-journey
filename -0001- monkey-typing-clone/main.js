const bodyContent = document.querySelectorAll(".skull, .trunk, .footer");
const mentionText = document.getElementById("mention-text"),
  inputText = document.getElementById("input-text"),
  restartBtn = document.querySelector(".restart-btn"),
  seeNoti = document.querySelector(".fa-bell"),
  announceNotify = document.querySelector(".announce-notify"),
  contact = document.querySelector(".contact"),
  contactInfo = document.querySelector(".contact-info"),
  support = document.querySelector(".support"),
  supportInfo = document.querySelector(".support-info"),
  typingResult = document.querySelector(".typing-result"),
  wpmValue = document.querySelectorAll(".wpm-value"),
  accPercent = document.querySelector(".accuracy-percent"),
  setTimer = document.querySelector("#timer");

// Setting an array of paragraphs;
const paragraphs = [
  "The sun was shining on the sea, Shining with all his might: He did his very best to make The billows smooth and bright And this was odd, because it was The middle of the night.",
  "The moon was shining sulkily, Because she thought the sun Had got no business to be there After the day was done 'It's very rude of him,' she said, 'To come and spoil the fun.",
  "Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler, long I stood And looked down one as far as I could To where it bent in the undergrowth.",
  "Then took the other, as just as fair, And having perhaps the better claim, Because it was grassy and wanted wear; Though as for that the passing there Had worn them really about the same.",
  "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man.",
  "May be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.",
  "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take arms against a sea of troubles And by opposing end them.",
  "To die: to sleep; No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to, 'tis a consummation Devoutly to be wished.",
  "In Xanadu did Kubla Khan A stately pleasure-dome decree: Where Alph, the sacred river, ran Through caverns measureless to man Down to a sunless sea.",
  "So twice five miles of fertile ground With walls and towers were girdled round: And there were gardens bright with sinuous rills, Where blossomed many an incense-bearing tree; And here were ancient forests.",
];

let paragraphArr = []; // Creating a paragraph array;
let inputArr = [];
let errs = 0;
let timerStarted = false;
let activeTab;

const checkInput = () => {
  mentionText.innerHTML = "";

  // Loopin each char within a paragraph array;
  paragraphArr.forEach((char, i) => {
    const keyChar = document.createElement("span");
    keyChar.textContent = char;

    if (i < inputText.value.length) {
      if (inputText.value[i] !== char) {
        keyChar.style.color = "#ca4754"; // Varifying inputing char with incorrect color sign;
        errs += 1;
      } else {
        keyChar.style.color = "#EDEADE"; // Varifying inputing char with correct color sign;
      }
    } else {
      keyChar.style.color = "#928c87"; // Default text color;
    }

    mentionText.appendChild(keyChar);
  });
};

// Reload the paragraphs automatically without stoping typing
inputText.addEventListener("input", () => {
  const lastChar = inputText.value[inputText.value.length - 1];

  if (lastChar === paragraphArr[paragraphArr.length - 1]) {
    inputText.value = "";
    startTyping();
  }
});

// Defining a function related to refresh paragraphs;
const startTyping = () => {
  const getParagraph =
    paragraphs[Math.floor(Math.random() * paragraphs.length)]; // Get a random paragraph;
  paragraphArr = getParagraph.split("");
  mentionText.textContent = getParagraph;

  mentionText.classList.add("fade-out-in"); // Fade Out In animation;
  mentionText.addEventListener("animationend", () => {
    mentionText.classList.remove("fade-out-in");
  });
  errs = null;
  timerStarted = false;
};

startTyping(); // Initial display a paragraph;
const result = () => {
  typingResult.style.display = "flex";
  let timeTaken = activeTab.innerHTML.trim() / 60;
  let wordsPerMinute = Math.round((inputArr.length - errs) / 5 / timeTaken);
  let netWordsPerMinute = Math.round(inputArr.length / 5 / timeTaken);
  let accuracy = Math.round(((inputArr.length - errs) / inputArr.length) * 100);
  let consistency = Math.round(netWordsPerMinute / wordsPerMinute) * 100;
  document.querySelector(".consistency").innerHTML = `${consistency}%`;
  console.log(consistency);
  wpmValue.forEach((element) => {
    element.innerText = `${wordsPerMinute}`;
  });
  accPercent.innerText = `${accuracy}%`;
  const timeShow = document.querySelectorAll(".time");
  timeShow.forEach((element) => {
    element.innerHTML = `${activeTab.innerHTML.trim()}s`;
  });
};

let character = 0;
// Checking the input value while listening the coming input key;
inputText.addEventListener("input", () => {
  checkInput();
  inputArr = inputText.value.split("");

  if (inputText.value.length > 0 && !timerStarted) {
    timerStarted = true;
    setTimer.style.display = "block";
    const timeAmount = activeTab.innerHTML.trim();

    if (timeAmount === "15") {
      startTimer(0, 15, result);
    } else if (timeAmount === "30") {
      startTimer(0, 30, result);
    } else if (timeAmount === "60") {
      startTimer(1, 0, result);
    } else if (timeAmount === "120") {
      startTimer(2, 0, result);
    }
  }

  character += 1;
  document.querySelector(".characters").innerHTML = `${character}`;
});

// Refreshing the paragraphs
restartBtn.addEventListener("click", () => {
  inputText.value = "";
  startTyping();
  restartBtn.classList.add("rotate");
  restartBtn.addEventListener("animationend", () => {
    restartBtn.classList.remove("rotate");
  });

  clearInterval(timer);
  setTimer.style.display = "none";
  document.getElementById("timer").textContent = "00 : 00";
});

document.querySelector(".fa-regular").addEventListener("click", () => {
  startTyping();
});

// Displaying announcements & notifications
seeNoti.addEventListener("click", () => {
  announceNotify.classList.toggle("display");
  announceNotify.style.opacity = "1";
  bodyContent.forEach((element) => {
    element.style.backgroundColor = "black";
    element.style.opacity = "0.5";
  });

  window.addEventListener("click", (event) => {
    if (
      !announceNotify.contains(event.target) &&
      !seeNoti.contains(event.target)
    ) {
      announceNotify.classList.remove("display");

      bodyContent.forEach((element) => {
        element.style.backgroundColor = "#323437";
        element.style.opacity = "1";
      });
    }
  });
});

// Menu Bar Tap Linking
const alreadySelected = (tab) => {
  tab.style.color = "#e2b714";
};

window.onload = () => {
  const punctuationTab = document.getElementById("punctuation");
  const timeTab = document.getElementById("time");
  const secondTab = document.getElementById("30second");

  alreadySelected(punctuationTab);
  alreadySelected(timeTab);
  alreadySelected(secondTab);
  activeTab = secondTab;
};

const tablinks = document.getElementsByClassName("tablink");

const selectedTab = (event) => {
  clickedTab = event.target;
  clickedTab.style.color = "#e2b714";

  if (activeTab && activeTab !== clickedTab) {
    activeTab.style.color = "";
  }
  activeTab = clickedTab;
  timerStarted = false;
};

for (let i = 0; i < tablinks.length; i++) {
  tablinks[i].addEventListener("click", (event) => {
    clearInterval(timer);
    document.getElementById("timer").textContent = "00 : 00";

    selectedTab(event);
    inputText.value = "";
    startTyping();
    setTimer.style.display = "none";
  });
}

// Setting timer function for different periods
let timer;

const startTimer = (min, sec, result) => {
  if (timer) {
    clearInterval(timer);
  }

  timer = setInterval(() => {
    if (sec === 0) {
      if (min === 0) {
        clearInterval(timer);
        result();
      } else {
        min -= 1;
        sec = 59;
      }
    } else {
      sec -= 1;
    }

    let minuteValue = min < 10 ? "0" + min : min;
    let secondValue = sec < 10 ? "0" + sec : sec;
    document.getElementById(
      "timer"
    ).textContent = `${minuteValue} : ${secondValue}`;
  }, 1000);
};

// Displaying Contact Information Modal
contact.addEventListener("click", () => {
  contactInfo.style.display = "flex";
});

window.addEventListener("click", (event) => {
  if (event.target === contactInfo) {
    contactInfo.style.display = "none";
  }
});

// Displaying Support Information Modal
support.addEventListener("click", () => {
  supportInfo.style.display = "flex";
});

window.addEventListener("click", (event) => {
  if (event.target === supportInfo) {
    supportInfo.style.display = "none";
  }
});

// Hide Typing Result Information Modal
window.addEventListener("click", (event) => {
  if (event.target === typingResult) {
    typingResult.style.display = "none";
    inputText.value = "";
    startTyping();
    clearInterval(timer);
    setTimer.style.display = "none";
    document.getElementById("timer").textContent = "00 : 00";
  }
});

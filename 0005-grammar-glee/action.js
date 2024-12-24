let totalQ = 10;

const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

let qIndex = 0;
const ques = document.getElementsByClassName("question");
const quesArr = Array.from(ques); // convert HTML elements collection into an array

// only initial question is visible
quesArr.forEach((q, i) => {
  q.style.display = i === 0 ? "flex" : "none";
});

const progress = document.getElementsByClassName("prog-crc");
const progArr = Array.from(progress);

progArr.forEach((p, i) => {
  p.style.backgroundColor = i === 0 ? "#9cd89d" : "#e0e0e0";
});

prevButton.addEventListener("click", () => {
  if (qIndex > 0) {
    quesArr[qIndex].style.display = "none"; // လက်ရှိ question ကို display ဖျောက်ရန်
    qIndex -= 1; // prev question ကိုသွားဖို့ index ကို (1) လျော့ပါ
    quesArr[qIndex].style.display = "flex";

    progArr.forEach((prog, i) => {
      if (i <= qIndex) {
        prog.style.color = "#ffffff";
        prog.style.backgroundColor = "#9cd89d";
      } else {
        prog.style.color = "";
        prog.style.backgroundColor = "";
      }
    });

    if (qIndex < quesArr.length - 1) {
      submitBtn.style.display = "none";
    }
  }
});

nextButton.addEventListener("click", () => {
  if (qIndex < quesArr.length - 1) {
    quesArr[qIndex].style.display = "none"; // လက်ရှိ question ကို display ဖျောက်ရန်
    qIndex += 1; // next question ကိုသွားဖို့ index ကို (1) တိုးပါ
    quesArr[qIndex].style.display = "flex";

    progArr.forEach((prog, i) => {
      if (i <= qIndex) {
        // တိုးလာတဲ့ qIndex ထက် i သည် ငယ်ပြီးညီမျှနေသရွေ့ from 0 to 9 progArr တစ်ခုလုံးကို loop ပတ်မယ်။
        prog.style.color = "#ffffff";
        prog.style.backgroundColor = "#9cd89d"; // တိုးလာတဲ့ qIndex ပေါ်မူတည်ပြီး အရောင်ပြောင်းပါသည်။
      } else {
        prog.style.color = "";
        prog.style.backgroundColor = ""; // flase ဖြစ်ရင် empty string
      }
    });

    if (qIndex === quesArr.length - 1) {
      submitBtn.style.display = "block";
    }
  }
});

let score = 0;
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");

submitBtn.addEventListener("click", () => {
  score = 0;
  for (let i = 1; i <= totalQ; i++) {
    let answer = document.querySelector(`input[name="Q-${i}-ans-opt"]:checked`);
    if (answer && answer.value === "true") {
      score += 1;
    }
  }
  displayScore();
});

const displayScore = () => {
  quesArr.forEach((ques) => (ques.style.display = "none"));
  document.querySelector("#btn-container").style.display = "none";
  document.querySelector(".progress-bar").style.display = "none";
  document.querySelector(".result-score").style.display = "block";
  document.getElementById(
    "score"
  ).innerHTML = `Your Score: ${score} out of 10!`;
  restartBtn.style.display = "block";
};

restartBtn.addEventListener("click", () => {
  location.reload(); // ပြန်လည်စတင်ရန် restart button ကို နှိပ်ရပါမည်။
});

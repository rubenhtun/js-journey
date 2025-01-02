// pomodoro timer တစ်ခု ဖန်တီးတည်ဆောက်ထားခြင်း
let minutes = 25;
let seconds = 0;
let run;

const timer = document.getElementById("timer");
const startTimer = document.getElementById("start-btn");
startTimer.addEventListener("click", () => {
  if (run) return; // start btn ကို တစ်ခါထက်ပိုပြီး နှိပ်မိခဲ့သည်ရှိသော် setInterval ထပ်ခါထပ်ခါ မrun မိစေရန်။
  run = setInterval(() => {
    if (seconds === 0) {
      seconds = 59;
      minutes -= 1;
      if (minutes === 0) {
        clearInterval(run);
        run = null;
        alert("It is time to take a break!");
        return;
      }
    } else {
      seconds -= 1;
    }
    document.getElementById("seconds").textContent =
      seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("minutes").textContent =
      minutes < 10 ? "0" + minutes : minutes;
  }, 1000);
});

const resetTimer = document.getElementById("reset-btn");
resetTimer.addEventListener("click", () => {
  clearInterval(run);
  run = null; // timer ကို ပြန်လည်စတင်ရန် reset လုပ်ပါသည်။
  minutes = 25;
  seconds = 0;
  document.getElementById("minutes").textContent = "25";
  document.getElementById("seconds").textContent = "00";
});

// Goal သတ်မှတ်နိုင်ရန် function တစ်ခုတည်ဆောက်ခြင်း
const goalInput = document.getElementById("goal-input");
goalInput.addEventListener("keydown", (e) => {
  // input အတွင်း Enter နှိပ်မိတဲ့အခါ အလုပ်လုပ်စေရန်။
  if (e.key === "Enter") {
    settingGoals();
  }
});

const addGoalBtn = document.getElementById("add-goal-btn");
addGoalBtn.addEventListener("click", () => settingGoals()); // addEventListner နှင့် နားထောင်

// ul အတွင်း li တစ်ခုချင်းစီအနေနဲ့ ပြသခြင်း
const goalList = document.getElementById("goal-list");
const settingGoals = () => {
  const goal = goalInput.value.trim();
  const li = document.createElement("li");
  li.textContent = goal;
  li.classList.add(
    // tailwind css ထည့်သွင်း
    "bg-green-100",
    "text-green-800",
    "px-4",
    "py-2",
    "rounded-lg",
    "shadow-md"
  );

  goalList.appendChild(li);
  goalInput.value = "";
};

// motivational quotes များကို ပြသစေခြင်း
const motivationalQuotes = [
  "The best time to plant a tree was 20 years ago. The second-best time is now.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Your time is limited, so don’t waste it living someone else’s life.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Opportunities don't happen. You create them.",
];

const quote = document.getElementById("quote");
const generateQuote = document.getElementById("new-quote-btn");

generateQuote.addEventListener("click", () => {
  quote.textContent = "";
  const randomQuote =
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]; // Math.random() ကိုသုံပြီး random index ကို ထုတ်ယူ
  quote.textContent = randomQuote;
});

const cardImages = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍍", "🥝", "🍑"];
const cardImagesArr = [...cardImages, ...cardImages]; // array နှစ်ခုပေါင်းစပ်ခြင်း

const shuffle = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap array elements နေရာ အပြောင်းအလဲလုပ်ပါသည်။
  }
  return arr; // ပြန် return ပေးပါသည်။
};

const shuffledCards = shuffle(cardImagesArr);

shuffledCards.forEach((card) => {
  const gameBoard = document.getElementById("game-board");
  const cardBox = document.createElement("div");
  cardBox.classList.add(
    "card",
    "bg-gray-700",
    "w-24",
    "h-24",
    "rounded-md",
    "flex",
    "items-center",
    "justify-center",
    "text-3xl",
    "cursor-pointer",
    "select-none",
    "transform",
    "transition-transform"
  );
  cardBox.textContent = "❓"; // မူလ card content
  cardBox.dataset.cardValue = card; // cardBox element မှာ data-card-value(cardValue) attribute ကို ပေါင်းထည့်လိုက်ပြီး card ဆိုတဲ့ variable ရဲ့ value ကို သတ်မှတ်တဲ့ လုပ်ဆောင်ချက်ပါ။
  gameBoard.appendChild(cardBox);

  cardBox.addEventListener("click", () => flipCard(cardBox)); // cardBox element ကို click လုပ်တဲ့အခါ flipCard function ကို ခေါ်မည်။
});

let flippedCards = [];

const flipCard = (cardBox) => {
  // အများဆုံး card နှစ်ခုပဲ flip လုပ်ခွင့်ရှိအောင် စီစဉ်ထားပါသည်။ ||
  // card တစ်ခုတည်းကို နှစ်ခါဆက်တိုက် flip လုပ်မိခဲ့လျှင်လည်း dataset.cardValue တူညီမသွားစေရန် flippedCards.includes(cardBox) ဖြင့် ထပ်မံ check ထားပါသည်။
  if (flippedCards.length === 2 || flippedCards.includes(cardBox)) return;
  flippedCards.push(cardBox); // flip လုပ်လိုက်တဲ့ cardBox element ကို flippedCards array ထဲထည့်ပါမည်။
  cardBox.classList.add("bg-green-500", "scale-110"); // add color and animation
  cardBox.textContent = cardBox.dataset.cardValue; // card image ကို textContent အနေဖြင့်ပြပါမည်။

  if (flippedCards.length === 2) {
    // တကယ်လို့ flip လုပ်လိုက်တဲ့ card အရေအတွက်က နှစ်ခုဖြစ်လာပြီရင် card နှစ်ခုကို နှိုင်းယှဉ်ပါမည်။
    setTimeout(() => checkMatch(), 500);
  }
};

const checkMatch = () => {
  const [card1, card2] = flippedCards; // နှိုင်းယှဉ်ဖို့အတွက် array အတွင်းရောက်ရှိနေပြီဖြစ်တဲ့ card နှစ်ခုကို ပြန် destructuring လုပ်ထားပါသည်။

  // အဘယ်ကြောင့်ဆို card နှစ်ခုအတွင်းရှိ ပုံများ တူမတူ စစ်ဆေးပေးရပါမည်။
  if (card1.dataset.cardValue === card2.dataset.cardValue) {
    // ပုံများသည်တူညီကြလျှင်
    card1.textContent = "✔️";
    card2.textContent = "✔️";
    card1.classList.add(
      "bg-gradient-to-r",
      "from-blue-400",
      "to-purple-500",
      "text-white",
      "shadow-lg"
    );
    card2.classList.add(
      "bg-gradient-to-r",
      "from-blue-400",
      "to-purple-500",
      "text-white",
      "shadow-lg"
    );

    flippedCards = []; // တခြားကျန်ရှိနေသော card များ ဆက်လက် flip လုပ်နိုင်ရန် flippedCards array ကို ပြန် clear လုပ်ထားရပါမည်။
  } else {
    setTimeout(() => {
      card1.classList.remove("bg-green-500", "scale-110");
      card2.classList.remove("bg-green-500", "scale-110");
      card1.textContent = "❓";
      card2.textContent = "❓";
      flippedCards = []; // တခြားကျန်ရှိနေသော card များ ဆက်လက် flip လုပ်နိုင်ရန် flippedCards array ကို ပြန် clear လုပ်ထားရပါမည်။
    }, 500);
  }
};

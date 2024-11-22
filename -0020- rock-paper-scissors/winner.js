// The name of the computer is given as nova. Nova is player's rival.
const novaChoice = () => {
  // nova ကို "rock", "paper", "scissors" သုံးခုထဲကတစ်ခုကို random ရွေးခိုင်းလိုက်တယ်။
  const options = ["rock", "paper", "scissors"];
  const randomChoice = options[Math.floor(Math.random() * options.length)];
  // random ရထားတဲ့ choice ကို return လိုက်
  return randomChoice;
};

let rival = novaChoice(); // return လာတဲ့ တန်ဖိုးကို သိမ်းထားပါသည်။

const result = document.getElementById("result"); // to dsiplay result of the game!

const playerChoice = (player) => {
  rival = novaChoice(); // player ရွေးချယ်မှုတစ်ခုလုပ်တိုင်းမှာ nova ကိုလည်း random ရွေးချယ်ခိုင်းရပါမည်။
  console.log("Rival chose:", rival);

  if (player === rival) {
    // တူညီကြလျှင်
    result.textContent = `It's a draw! Both chose ${player}.`;
  } else if (player === "rock" && rival === "scissors") {
    // rock က scissors ကို နိုင်သည်။
    result.textContent = "Player wins! Rock beats Scissors.";
  } else if (player === "paper" && rival === "rock") {
    // paper က rock ကို နိုင်သည်။
    result.textContent = "Player wins! Paper beats Rock.";
  } else if (player === "scissors" && rival === "paper") {
    // scissors က paper ကို နိုင်သည်။
    result.textContent = "Player wins! Scissors beats Paper.";
  } else if (player === "rock" && rival === "paper") {
    // rock က paper ကို မနိုင်ပါ။
    result.textContent = "Rival wins! Paper beats Rock.";
  } else if (player === "paper" && rival === "scissors") {
    // paper က scissors ကို မနိုင်ပါ။
    result.textContent = "Rival wins! Scissors beats Paper.";
  } else if (player === "scissors" && rival === "rock") {
    // scissors က rock ကို မနိုင်ပါ။
    result.textContent = "Rival wins! Rock beats Scissors.";
  }
};

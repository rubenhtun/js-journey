const quotes = [
  {
    quote: "The best way to predict the future is to invent it.",
    author: "- Alan Kay",
  },
  {
    quote: "Life is 10% what happens to us and 90% how we react to it.",
    author: "- Charles R. Swindoll",
  },
  {
    quote: "Do what you can, with what you have, where you are.",
    author: "- Theodore Roosevelt",
  },
  {
    quote:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "- Winston Churchill",
  },
  {
    quote: "You miss 100% of the shots you don’t take.",
    author: "- Wayne Gretzky",
  },
  {
    quote:
      "The only limit to our realization of tomorrow is our doubts of today.",
    author: "- Franklin D. Roosevelt",
  },
  {
    quote: "In the middle of every difficulty lies opportunity.",
    author: "- Albert Einstein",
  },
  {
    quote:
      "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "- Zig Ziglar",
  },
  {
    quote: "If you want to lift yourself up, lift up someone else.",
    author: "- Booker T. Washington",
  },
  {
    quote:
      "Happiness is not something ready-made. It comes from your own actions.",
    author: "- Dalai Lama",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "- Steve Jobs",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "- Confucius",
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "- Theodore Roosevelt",
  },
  {
    quote: "Act as if what you do makes a difference. It does.",
    author: "- William James",
  },
  {
    quote:
      "Keep your face always toward the sunshine—and shadows will fall behind you.",
    author: "- Walt Whitman",
  },
  {
    quote: "Opportunities don't happen, you create them.",
    author: "- Chris Grosser",
  },
  {
    quote: "It always seems impossible until it’s done.",
    author: "- Nelson Mandela",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "- Eleanor Roosevelt",
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "- Sam Levenson",
  },
  {
    quote:
      "Success usually comes to those who are too busy to be looking for it.",
    author: "- Henry David Thoreau",
  },
  { quote: "The purpose of our lives is to be happy.", author: "- Dalai Lama" },
  { quote: "The best revenge is massive success.", author: "- Frank Sinatra" },
  {
    quote: "You only live once, but if you do it right, once is enough.",
    author: "- Mae West",
  },
  {
    quote:
      "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "- Winston Churchill",
  },
  {
    quote:
      "Do not wait to strike till the iron is hot, but make it hot by striking.",
    author: "- William Butler Yeats",
  },
  {
    quote:
      "Your time is limited, so don’t waste it living someone else’s life.",
    author: "- Steve Jobs",
  },
  {
    quote: "Whether you think you can or you think you can’t, you’re right.",
    author: "- Henry Ford",
  },
  {
    quote:
      "I can accept failure, everyone fails at something. But I can’t accept not trying.",
    author: "- Michael Jordan",
  },
  {
    quote:
      "Do what you feel in your heart to be right—for you’ll be criticized anyway.",
    author: "- Eleanor Roosevelt",
  },
  {
    quote: "Fall seven times and stand up eight.",
    author: "- Japanese Proverb",
  },
  { quote: "Dream big and dare to fail.", author: "- Norman Vaughan" },
  {
    quote:
      "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "- Ralph Waldo Emerson",
  },
  {
    quote: "It is never too late to be what you might have been.",
    author: "- George Eliot",
  },
  {
    quote: "Strive not to be a success, but rather to be of value.",
    author: "- Albert Einstein",
  },
  {
    quote: "I have not failed. I’ve just found 10,000 ways that won’t work.",
    author: "- Thomas Edison",
  },
  {
    quote:
      "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.",
    author: "- Jamie Paolinetti",
  },
  {
    quote:
      "Courage is resistance to fear, mastery of fear—not absence of fear.",
    author: "- Mark Twain",
  },
  {
    quote:
      "Too many of us are not living our dreams because we are living our fears.",
    author: "- Les Brown",
  },
  {
    quote: "Do what you love and the money will follow.",
    author: "- Marsha Sinetar",
  },
  {
    quote: "A journey of a thousand miles begins with a single step.",
    author: "- Lao Tzu",
  },
  {
    quote:
      "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    author: "- Roy T. Bennett",
  },
  {
    quote: "It is not in the stars to hold our destiny but in ourselves.",
    author: "- William Shakespeare",
  },
  {
    quote:
      "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
    author: "- Joshua J. Marine",
  },
  {
    quote: "Don’t wait. The time will never be just right.",
    author: "- Napoleon Hill",
  },
  {
    quote: "You must be the change you wish to see in the world.",
    author: "- Mahatma Gandhi",
  },
  {
    quote: "If you’re going through hell, keep going.",
    author: "- Winston Churchill",
  },
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "- Nelson Mandela",
  },
  {
    quote: "Success is how high you bounce when you hit bottom.",
    author: "- George S. Patton",
  },
  {
    quote: "What you do today can improve all your tomorrows.",
    author: "- Ralph Marston",
  },
  {
    quote:
      "If you want something you’ve never had, you must be willing to do something you’ve never done.",
    author: "- Thomas Jefferson",
  },
];

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const generateBtn = document.querySelector(".generate-btn");

generateBtn.addEventListener("click", () => {
  const randomQuoteObj = quotes[Math.floor(Math.random() * quotes.length)];
  quote.textContent = randomQuoteObj.quote;
  author.textContent = randomQuoteObj.author;
  console.log("hello");
});

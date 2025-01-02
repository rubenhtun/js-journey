// html element များကို id ဖြင့် ရယူပါသည်။
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const results = document.getElementById("results");

const Mov_Web_API_KEY = "7375868b"; // omdbapi.com မှ API key ကို ထည့်အသုံးပြုပါမည်။

// အကယ်၍ user သည် search input တွင် Enter Key နှိပ်ပြီးရှာခဲ့သော်
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    fetchMovies();
  }
});

// Search Button ကို နှိပ်သောအခါ callback function တစ်ခုကိုအသုံးပြုပြီး data fetch လုပ်ပါမည်။
searchButton.addEventListener("click", () => fetchMovies());

const fetchMovies = async () => {
  const queryValue = searchInput.value.trim();
  if (queryValue) {
    // searchInput မှ input term မှန်ကန်မှသာလျှင် fetch လုပ်နိုင်ပါမည်။
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${Mov_Web_API_KEY}&s=${queryValue}`
      );

      if (!response.ok) throw new Error("Failed to fetch DATA!"); // server response အဆင်မပြေဖြစ်ခဲ့ရင်
      const movieData = await response.json();

      if (movieData.Response === "True") {
        movieDisplay(movieData.Search); // movies အချက်အလက်များကို ပြသနိုင်ရန် response movieData ထဲကမှ Search ဆိုတဲ့ array object ကို ရယူပါသည်။
      } else {
        results.innerHTML = `<p class="text-red-500">"${queryValue}" ဆိုသည့်ရလဒ်မရှိပါ!</p>`;
      }
    } catch (err) {
      console.log("Error: ", err);
      results.innerHTML = `<p class="text-red-500">အမှားယွင်းတစ်ခုဖြစ်နေပါသည်: ${err.message}</p>`;
    }
  } else {
    results.innerHTML = `<p class="text-red-500">ကျေးဇူးပြု၍ ရှာဖွေရန်စကားလုံးရိုက်ထည့်ပါ။</p>`;
  }
};

// movies များကို display လုပ်ရန် function တစ်ခုကို တည်ဆောက်ပါမည်။
const movieDisplay = (movies) => {
  // movieData.Seach မှ arguments များသည် movies parameter သို့ လက်ခံရရှိပါမည်။
  results.innerHTML = movies
    .map(
      // map method ကို အသုံးပြုထားပါသည်။
      (movie) => `
    <div class="bg-white shadow-md rounded p-4">
      <img
        src="${
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/150"
        }"
        alt="${movie.Title}"
        class="w-full h-64 object-cover rounded mb-4"
      />
      <h2 class="text-xl font-bold">${movie.Title}</h2>
      <p class="text-gray-600">Year: ${movie.Year}</p>
      <p class="text-gray-500">Type: ${movie.Type}</p>
    </div>
  `
    )
    .join(""); // array အတွင်းရှိ elements တွေကို string တစ်ခုအဖြစ် အတူတကွပေါင်းစပ်ပေး။
};

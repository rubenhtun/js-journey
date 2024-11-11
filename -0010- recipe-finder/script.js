// api url ကို www.themealdb.com ကနေရယူပါသည်။ // ၎င်း website မှ V1 API တွင် link ကိုရယူနိုင်ပါသည်။
const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// ကြိုက်တဲ့ delicious recipe ကိုရွေးနိုင်ရန် select category feature ပေးရမှာပါ။
// ထို့ကြောင့် api ကနေ categories တွေကိုရယူဖို့ loadCategories() function ကိုအသုံးပြုပါသည်။

window.onload = () => loadCategories();

// asynchronous function
const loadCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories.php`);
    if (!response.ok) throw new Error("Category loading fail!"); // response မလာခဲ့ရင် error ပြပါမယ်။
    const data = await response.json();
    if (data) {
      data.categories.forEach((category) => {
        // ရရှိလာမည့် data object ထဲတွင် categories array ဆိုတာရှိပါတယ်။
        const option = document.createElement("option");
        option.value = category.strCategory; // value အဖြစ် category name ထည့်ပါမည်။
        option.textContent = category.strCategory; // textContent အဖြစ် category name ထည့်ပါမည်။
        document.getElementById("categorySelect").appendChild(option);
      });
    } else {
      console.error("Fetching data failed!");
    }
  } catch (err) {
    console.error("Error loading categories: ", err);
  }
};
// browser page ကို onload or refresh လုပ်တိုင်း category select options တွေကို loop လုပ်စေပါမည်။
// ထို့ကြောင့် window.onload ကို loadCategories function ရဲ့ အပေါ်မှာရေးသားရပါမည်။

// input search bar တွင် user ရိုက်ထည့်လာမည့် text ကို ရယူပြီး၊ ရိုက်ထည့်လိုက်သော စကားလုံးနဲ့ ဆီလျော်သော food recipes data ကို ရယူပါမည်။
// ၎င်းအတွက် searchInput() function ကိုအသုံးပြုပါမည်။
const searchRecipes = async () => {
  const searchTerm = document.getElementById("searchInput").value.trim(); // user input
  if (!searchTerm) return; // if not relevant term

  showLoading(true); // data များကို load လုပ်နေကြောင်း သဘောအနေဖြင့်ပါ။
  clearResults();

  try {
    const response = await fetch(`${API_BASE_URL}/search.php?s=${searchTerm}`); // api url ထဲ query parameter နဲ့ဆက်ပါမည်။
    const data = await response.json();
    // ရလာတဲ့ data ကို ပြသနိုင်ဖို့ရန်အလို့ငှာ displayResults() function ကို call back အနေအားဖြင့် ခေါ်ပါမည်။
    displayResults(data.meals || []); // argument ကို data.meals array ကိုထည့်ပေးပါမည်။
  } catch (err) {
    console.error("Error feching recipes: ", err);
    displayError("Failed to fetch recipes. Please try again later.");
  } finally {
    // datafetching လုပ်ပြီးနောက် showloading feature ပိတ်ပါမည်။
    showLoading(false);
  }
};

// အကယ်၍ serachInput တွင် Enter Key ခေါက်ပြီး ရှာခဲ့သော်
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchRecipes();
  }
});

// category ဖြင့် meal recipes များ ရှာယူနိုင်ရန်
const searchByCategory = async () => {
  const category = document.getElementById("categorySelect").value;
  if (!category) return;

  showLoading(true); // data များကို load လုပ်နေကြောင်း သဘောအနေဖြင့်ပါ။
  clearResults();

  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`); // category type ကို query parameter အနေနဲ့ဆက်
    const data = await response.json();
    displayResults(data.meals || []);
  } catch (err) {
    console.error("Error fetching category recipes:", err);
    displayError("Failed to fetch recipes. Please try again.");
  } finally {
    showLoading(false); // datafetching လုပ်ပြီးနောက် showloading feature ပိတ်ပါမည်။
  }
};

const displayResults = (meals) => {
  const resultsContainer = document.getElementById("results");
  if (meals.length === 0) {
    displayError("No recipes found. Try a different search term.");
    return;
  }
  meals.forEach((meal) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow";
    card.innerHTML = `
                      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-cover">
                      <div class="p-4">
                          <h3 class="text-lg font-semibold text-gray-800 mb-2">${meal.strMeal}</h3>
                          <button
                              onclick="showRecipeDetails('${meal.idMeal}')"
                              class="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors w-full"
                          >
                              View Recipe
                          </button>
                      </div>
                  `;
    resultsContainer.appendChild(card);
  });
};

// fetching လုပ်နေကြောင်း ပြသသည့်အနေဖြင့်
const showLoading = (show) => {
  document.getElementById("loading").classList.toggle("hidden", !show);
};

// Search Button ကို click လုပ်တိုင်း ယခင်ပြသထားသည့် recipes များကို ပြန် clear လုပ်ရပါမည်။
// မဟုတ်ပါက meals များကို ထပ်ခါတလဲလဲ ပြသနေမည်ဖြစ်ပါသည်။
const clearResults = () => {
  document.getElementById("results").innerHTML = "";
};

// meal တစ်ခုချင်းစီ၏ recipe details ကို ပြသရန်
const showRecipeDetails = async (mealId) => {
  showLoading(true);
  document.getElementById("recipeModal").classList.remove("hidden"); // modal ကို appear ဖြစ်လာဖို့ရန်

  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);
    const data = await response.json();
    const recipe = data.meals[0];

    // ingredients and measures ကို meal array obect ထည့်မှရယူခြင်း
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
      }
    }

    document.getElementById("modalTitle").textContent = recipe.strMeal;
    document.getElementById("modalContent").innerHTML = `
                    <img src="${recipe.strMealThumb}" alt="${
      recipe.strMeal
    }" class="w-full h-64 object-cover rounded-lg mb-4">
                    <div class="mb-4">
                        <p class="text-gray-600">Category: ${
                          recipe.strCategory
                        }</p>
                        <p class="text-gray-600">Origin: ${
                          recipe.strArea || "Not specified"
                        }</p>
                    </div>
                    <div class="mb-4">
                        <h3 class="text-xl font-semibold mb-2">Ingredients</h3>
                        <ul class="list-disc pl-5">
                            ${ingredients
                              .map((ingredient) => `<li>${ingredient}</li>`)
                              .join("")}
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-2">Instructions</h3>
                        <p class="whitespace-pre-line">${
                          recipe.strInstructions
                        }</p>
                    </div>
                    ${
                      recipe.strYoutube
                        ? `
                        <div class="mt-4">
                            <h3 class="text-xl font-semibold mb-2">Video Tutorial</h3>
                            <a href="${recipe.strYoutube}" target="_blank" class="text-purple-500 hover:text-purple-600">
                                Watch on YouTube
                            </a>
                        </div>
                    `
                        : ""
                    }
                `;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    displayError("Failed to fetch recipe details. Please try again.");
  } finally {
    showLoading(false); // datafetching လုပ်ပြီးနောက် showloading feature ပိတ်ပါမည်။
  }
};

// recipe ကိုဖော်ပြပေးသော toggle mod‌al ကို ပိတ်စေရန်
const closeModal = () => {
  document.getElementById("recipeModal").classList.add("hidden");
};

// to close modal when clicking outside >> toggle ၏အပြင်ဘက်ကို နှိပ်သောအခါ
document.getElementById("recipeModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("recipeModal")) {
    closeModal();
  }
});

// error message ကိုပြသရန် div element
const displayError = (message) => {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = `
          <div class="col-span-full text-center text-red-500 py-4">
              ${message}
          </div>
      `;
};

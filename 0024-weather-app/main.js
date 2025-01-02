/* ---------------------------------------------------- 
DOM Manipulation
---------------------------------------------------- */
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");

/* ---------------------------------------------------- 
Event Listener && Kyedown Enter Event
---------------------------------------------------- */
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    get_Weather_Info();
  }
});

searchBtn.addEventListener("click", () => {
  get_Weather_Info();
});

/* ---------------------------------------------------- 
Define Get Weather Info Function
---------------------------------------------------- */
const get_Weather_Info = async () => {
  const API_KEY = "6594ce1a6044c12069ca4cb67ee9cbc3";
  const city = cityInput.value.trim();
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("City not found!");
    const data = await response.json();

    cityName.textContent = `${data.name}`;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    condition.textContent = `Condition: ${data.weather[0].description}`;
  } catch (err) {
    console.error(err.message);
    alert(err.message);
  }
};

// Finish //

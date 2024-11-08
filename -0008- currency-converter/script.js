const convertCurrency = async () => {
  const entAmount = document.getElementById("amount").value;
  const sourceCurrency = document.getElementById("sourceCurrency").value;
  const targetCurrency = document.getElementById("targetCurrency").value;
  const result = document.getElementById("result");

  const apiKey = "d7fb994f3b0eab016e673830"; // ကိုယ်ပိုင် API key
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${sourceCurrency}`; // API မှာ sourceCurrency အပေါ်မူတည်ပြီး URL ဖော်ပြပါသည်။

  try {
    const response = await fetch(apiUrl); // API ကို fetch ပြုလုပ်ခြင်းဖြင့် data ကို server မှရယူပါမည်။
    if (!response.ok) throw new Error("Network response was not ok!"); // Network error ဖြစ်ပါက အမှားပြသပါမည်။

    const moneyExchangeData = await response.json(); // API ကနေလာတဲ့ response ကို JSON format အဖြစ်ပြောင်းပါမည်။

    if (moneyExchangeData.conversion_rates) {
      // conversion_rates ရှိမှသာ process ကိုဆက်လုပ်ပါမည်။
      const exchangeRate = moneyExchangeData.conversion_rates[targetCurrency]; // targetCurrency အတွက် လဲလှယ်နှုန်းကို ရယူပါမည်။
      const convertedAmount = entAmount * exchangeRate;
      result.innerHTML = convertedAmount.toFixed(2);
    } else {
      result.innerHTML = "Conversion failed. Please try again!";
    }
  } catch (err) {
    console.error("Error:", err);
    result.innerHTML = "An error occurred. Please try again!";
  }
};

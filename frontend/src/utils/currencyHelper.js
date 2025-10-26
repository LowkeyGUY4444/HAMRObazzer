// src/utils/currencyHelper.js

export const getUserCurrency = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    let currency = "USD"; // default
    if (data.country_code === "NP") currency = "NPR";
    else if (data.country_code === "IN") currency = "INR";

    return currency;
  } catch (error) {
    console.error("Error fetching user currency:", error);
    return "USD";
  }
};

export const convertCurrency = async (amountInNPR, targetCurrency) => {
  if (targetCurrency === "NPR") return amountInNPR;

  try {
    const res = await fetch(
      `https://api.exchangerate.host/convert?from=NPR&to=${targetCurrency}&amount=${amountInNPR}`
    );
    const data = await res.json();
    return data.result || amountInNPR;
  } catch (error) {
    console.error("Error converting currency:", error);
    return amountInNPR;
  }
};

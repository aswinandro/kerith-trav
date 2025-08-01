const API_KEY = "4d21aeb02bfe8bf5916241e312f45809";

const cache = {
  symbols: null,
  rates: new Map(), // key: `${from}_${to}`
};

const saveToLocalStorage = (key, data, ttlMinutes = 60) => {
  const expiry = Date.now() + ttlMinutes * 60 * 1000;
  localStorage.setItem(key, JSON.stringify({ data, expiry }));
};

const getFromLocalStorage = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  try {
    const { data, expiry } = JSON.parse(cached);
    if (Date.now() < expiry) return data;
    localStorage.removeItem(key);
  } catch {
    localStorage.removeItem(key);
  }

  return null;
};

// Fetch all available currency symbols with caching
export const getAllCurrencies = async () => {
  if (cache.symbols) return cache.symbols;

  const local = getFromLocalStorage("currency_symbols");
  if (local) {
    cache.symbols = local;
    return local;
  }

  try {
    const response = await fetch(
      `https://api.exchangerate.host/symbols?access_key=${API_KEY}`
    );
    const data = await response.json();

    if (!data.success) throw new Error(data?.error?.info || "API error");

    const symbols = Object.entries(data.symbols).map(([code, { description }]) => ({
      code,
      name: description,
    }));

    cache.symbols = symbols;
    saveToLocalStorage("currency_symbols", symbols, 1440); // cache 24 hours

    return symbols;
  } catch (error) {
    console.error("Failed to fetch currencies:", error);
    return [];
  }
};

// Get the exchange rate from one currency to another with caching
export const getExchangeRate = async (fromCurrency, toCurrency = "USD") => {
  const cacheKey = `${fromCurrency}_${toCurrency}`;

  if (cache.rates.has(cacheKey)) return cache.rates.get(cacheKey);

  const local = getFromLocalStorage(`rate_${cacheKey}`);
  if (local !== null) {
    cache.rates.set(cacheKey, local);
    return local;
  }

  try {
    const response = await fetch(
      `https://api.exchangerate.host/convert?access_key=${API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=1`
    );
    const data = await response.json();

    if (!data.success) throw new Error(data?.error?.info || "API error");

    const rate = data.result || null;

    if (rate !== null) {
      cache.rates.set(cacheKey, rate);
      saveToLocalStorage(`rate_${cacheKey}`, rate, 120); // cache 2 hours
    }

    return rate;
  } catch (error) {
    console.error("Exchange rate fetch error:", error);
    return null;
  }
};

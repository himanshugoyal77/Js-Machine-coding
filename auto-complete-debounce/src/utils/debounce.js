const getSuggestions = async (url) => {
  const response = await fetch(url);

  const data = await response.json();
  return data;
};

const debounce = (fn, delay) => {
  if (typeof fn !== "function") {
    throw new Error("Invalid function received!");
  }
  if (typeof delay !== "number") {
    throw new Error("Invalid delay received!");
  }

  let timer;

  return (...args) => {
    return new Promise((resolve, reject) => {
      clearInterval(timer);
      timer = setTimeout(async () => {
        try {
          const data = await fn(args);
          resolve(data);
        } catch (err) {
          reject(err.message);
        }
      }, delay);
    });
  };
};

export const debouncedFn = debounce(getSuggestions, 1000);

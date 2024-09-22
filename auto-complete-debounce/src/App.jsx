/*
  input box
  suggestion list
  debounce
*/

import { useState, useEffect } from "react";
import { debouncedFn } from "./utils/debounce";

const App = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    async function getDebouncedData() {
      const res = await debouncedFn(
        `https://api.frontendeval.com/fake/food/${input}`
      );
      console.log("res", res);
      setSuggestions(res);
    }
    if (input === "") return;
    getDebouncedData();
  }, [input]);

  return (
    <div>
      <input value={input} onChange={handleChange} type="text" />
      <div className="">
        <ul>
          {suggestions?.length > 0 &&
            suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

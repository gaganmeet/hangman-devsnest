import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const baseUrl = `https://random-word-api.herokuapp.com/word?number=1`;
  const [apiUrl, setApiUrl] = useState(baseUrl);
  const [word, setWord] = useState("");
  useEffect(
    () => axios.get(apiUrl).then((apidata) => setWord(apidata.data)),
    [apiUrl]
  );
  console.log("word", word);
  console.log("api url", apiUrl);
  return (
    <div className="App">
      <h1>{word[0]}</h1>
      <button onClick={() => setApiUrl(baseUrl + "")}>Change word</button>
    </div>
  );
}

export default App;

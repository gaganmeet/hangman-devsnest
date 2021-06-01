import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const baseUrl = `https://random-word-api.herokuapp.com/word?number=1`;
  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const [word, setWord] = useState("");
  const [guessList, setGuessList] = useState([]);
  const [guesses, setGuesses] = useState(7);
  const [game, setGame] = useState(true);
  const getWord = (word) =>
    axios
      .get(baseUrl)
      .then((apidata) => {
        setWord(apidata.data);
        return apidata.data;
      })
      .then((data) => makeEmpty(data));
  useEffect(() => {
    getWord();
  }, []);

  const makeEmpty = (word) => {
    let temp = [];
    for (let i = 0; i < word[0].length; i++) {
      temp.push("_");
    }
    setGuessList(temp);
  };
  const alphabetClick = (idx) => {
    if (guesses === 0) {
      setGame((prev) => (prev = false));
      return;
    }
    let alphabet = alphabets[idx];
    let w = word[0].toUpperCase();
    w = w.split("");
    let found = w.includes(alphabet);
    let temp = guessList;
    if (found !== false) {
      for (let i = 0; i < w.length; i++) {
        if (w[i] === alphabet) temp[i] = alphabet;
      }
      setGuessList([...temp]);
    } else {
      setGuesses((prev) => prev - 1);
    }
  };
  const playAgain = () => {
    setGame(true);
    setGuesses(7);
    getWord();
  };
  return (
    <div className="App">
      <h1>Hangman Game</h1>
      {game ? (
        <>
          <div className="guesslist">
            {guessList.map((item, idx) => (
              <h1 key={idx}>{item}</h1>
            ))}
          </div>
          <div className="guessBtn">
            {alphabets.map((item, idx) => (
              <button
                key={idx}
                onClick={() => alphabetClick(idx)}
                className="alphBtn"
              >
                {item}
              </button>
            ))}
          </div>
          <button onClick={() => getWord()}>Change word</button>
          <h1>Guesses left : {guesses}</h1>
        </>
      ) : (
        <>
          <h1>Game Over</h1>
          <button onClick={() => playAgain()}>Play Again</button>
        </>
      )}
    </div>
  );
}

export default App;

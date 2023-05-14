//Css
import './App.css';

//React
import { useCallback, useEffect, useState} from 'react';

//Data
import { wordList as wordsList } from './data/words';

//Components
import StartScream from './components/StartScream';
import Game from './components/Game';
import End from './components/End';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setpickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {word, category};
  }, [words])

  const startGame = useCallback(() => {
    clearLettersStates();

    const { word, category} = pickWordAndCategory();

    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase())


    setPickedWord(word);
    setpickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory])

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter 
      ])
    } else{
      setWrongLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter 
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  function clearLettersStates(){
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if(guesses <= 0){
      clearLettersStates();
      setGameStage(stages[2].name);
    }
  }, [guesses])

  useEffect(() => {
    // aqui estou fzd um array unico de letras
    const uniqueletters = [...new Set(letters)];

    if(guessedLetters.length === uniqueletters.length){
      setScore((actualScore) => actualScore += 100)

      startGame();
    }
  }, [guessedLetters, letters, startGame])

  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  }
  return (
    <div className="App">
      {gameStage === 'start' && <StartScream startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
      {gameStage === 'end' && <End retry={retry} score={score}/>}
    </div>
  );
}

export default App;

import { useState } from "react";
import GameBoard from "../components/gameBoard";
import { answers, initialGameState, words } from "../utils/constants";
import { guess } from "../types";

export default function Game() {
  const [answer, setAnswer] = useState(
    answers[Math.floor(Math.random() * answers.length)]
  );
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [won, setWon] = useState(false);
  const [guesses, setGuesses] = useState(initialGameState as guess[]);

  const updateGuess = (keyPressed: string, currentGuess: guess) => {
    let currentGuessLetters = currentGuess.letters;
    let nextEmptyIndex = currentGuessLetters.findIndex(
      (letter) => letter === ""
    );
    if (nextEmptyIndex === -1) nextEmptyIndex = 5;
    const lastNonEmptyIndex = nextEmptyIndex - 1;
    if (keyPressed !== "<" && keyPressed !== "Enter" && nextEmptyIndex < 5) {
      currentGuessLetters[nextEmptyIndex] = keyPressed;
      const updatedGuess = { ...currentGuess, letters: currentGuessLetters };
      setGuesses((prev) => {
        return prev.map((guess, idx) => {
          if (idx === currentGuessIndex) return updatedGuess;
          else return guess;
        });
      });
    } else if (keyPressed === "<") {
      currentGuessLetters[lastNonEmptyIndex] = "";
      const updatedGuess = { ...currentGuess, letters: currentGuessLetters };
      setGuesses((prev) => {
        return prev.map((guess, idx) => {
          if (idx === currentGuessIndex) return updatedGuess;
          else return guess;
        });
      });
    }
  };

  const checkGuess = (currentGuess: guess) => {
    const currentGuessedWord = currentGuess.letters.join("");
    if (currentGuessedWord.length === 5) {
      if (currentGuessedWord === answer) {
        const matches = currentGuess.letters.map((letter, idx) => {
          if (letter === answer[idx]) return "correct";
          else if (answer.includes(letter)) return "present";
          else return "absent";
        });

        const updatedGuess = {
          ...currentGuess,
          matches,
          isComplete: true,
          isCorrect: true,
        };

        setGuesses((prev) => {
          return prev.map((guess, idx) => {
            if (idx === currentGuessIndex) return updatedGuess;
            else return guess;
          });
        });
        setWon(true);
        alert("You won!");
      } else if (words.concat(answers).includes(currentGuessedWord)) {
        const matches = currentGuess.letters.map((letter, idx) => {
          if (letter === answer[idx]) return "correct";
          else if (answer.includes(letter)) return "present";
          else return "absent";
        });
        const updatedGuess = {
          ...currentGuess,
          matches,
          isComplete: true,
          isCorrect: false,
        };
        setGuesses((prev) => {
          return prev.map((guess, idx) => {
            if (idx === currentGuessIndex) return updatedGuess;
            else return guess;
          });
        });
        setCurrentGuessIndex((prev) => prev + 1);
      } else {
        alert("Not in word list");
      }
    }
  };

  const handleGuess = (keyPressed: string) => {
    const currentGuess = guesses[currentGuessIndex];
    if (keyPressed !== "Enter" && !currentGuess.isComplete) {
      updateGuess(keyPressed, currentGuess);
    } else if (keyPressed === "Enter" && !won) {
      checkGuess(currentGuess);
    }
  };

  const resetGameState = () => {
    setGuesses((prev) => {
      return prev.map((_) => {
        return {
          letters: ["", "", "", "", ""],
          matches: ["", "", "", "", ""],
          isComplete: false,
          isCorrect: false,
        };
      });
    });
  };

  const resetGame = () => {
    resetGameState();
    setCurrentGuessIndex(0);
    setWon(false);
    setAnswer(answers[Math.floor(Math.random() * answers.length)]);
  };

  return (
    <>
      <GameBoard
        answer={answer}
        guesses={guesses}
        handleGuess={handleGuess}
        resetGame={resetGame}
      />
    </>
  );
}

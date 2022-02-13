import { useRef } from "react";
import { View } from "react-native";
import GameBoard from "../components/gameBoard";
import {
  answers,
  HEIGHT,
  initialGuesses,
  SIZE,
  words,
} from "../utils/constants";
import { guess } from "../types";

import { useAppSelector, useAppDispatch } from "../hooks/storeHooks";
import {
  setCurrentGuessIndex,
  setGameWon,
  setSolution,
  setGuesses,
  setUsedKeys,
} from "../store/slices/gameStateSlice";
import AnimatedLottieView from "lottie-react-native";

export default function Game() {
  const { guesses, usedKeys, currentGuessIndex, gameWon, solution } =
    useAppSelector((state) => state.gameState);
  const lottieRef = useRef<AnimatedLottieView>(null);
  const dispatch = useAppDispatch();

  const handleFoundKeysOnKeyboard = (guess: any) => {
    let tempUsedKeys = { ...usedKeys };
    guess.letters.forEach((letter: string, idx: number) => {
      const keyValue = tempUsedKeys[letter];
      if (!keyValue) tempUsedKeys[letter] = guess.matches[idx];
      else if (keyValue === "correct") return;
      else if (keyValue && guess.matches[idx] === "correct") {
        tempUsedKeys[letter] = "correct";
      } else tempUsedKeys[letter] = guess.matches[idx];
    });
    dispatch(setUsedKeys(tempUsedKeys));
  };

  const updateGuess = (keyPressed: string, currentGuess: guess) => {
    let currentGuessLetters = [...currentGuess.letters];
    let nextEmptyIndex = currentGuessLetters.findIndex(
      (letter) => letter === ""
    );
    if (nextEmptyIndex === -1) nextEmptyIndex = 5;
    let lastNonEmptyIndex = nextEmptyIndex - 1;
    if (keyPressed !== "<" && keyPressed !== "Enter" && nextEmptyIndex < 5) {
      currentGuessLetters[nextEmptyIndex] = keyPressed;
      let updatedGuess = { ...currentGuess, letters: currentGuessLetters };
      let updatedGuesses = guesses.map((guess, idx) => {
        if (idx === currentGuessIndex) return updatedGuess;
        else return guess;
      });
      dispatch(setGuesses([...updatedGuesses]));
    } else if (keyPressed === "<") {
      currentGuessLetters[lastNonEmptyIndex] = "";
      let updatedGuess = { ...currentGuess, letters: currentGuessLetters };
      let updatedGuesses = guesses.map((guess, idx) => {
        if (idx === currentGuessIndex) return updatedGuess;
        else return guess;
      });
      dispatch(setGuesses([...updatedGuesses]));
    }
  };

  const checkGuess = (currentGuess: guess) => {
    let currentGuessedWord = currentGuess.letters.join("");
    if (currentGuessedWord.length === 5) {
      if (currentGuessedWord === solution) {
        let matches = ["correct", "correct", "correct", "correct", "correct"];
        let updatedGuess = {
          ...currentGuess,
          matches,
          isComplete: true,
          isCorrect: true,
        };
        let updatedGuesses = guesses.map((guess, idx) => {
          if (idx === currentGuessIndex) return updatedGuess;
          else return guess;
        });
        dispatch(setGuesses(updatedGuesses));
        dispatch(setGameWon(true));
        setTimeout(() => {
          lottieRef.current?.play();
        }, 250 * 6);
        handleFoundKeysOnKeyboard(updatedGuess);
      } else if (words.concat(answers).includes(currentGuessedWord)) {
        let matches = currentGuess.letters.map((letter, idx) => {
          let currentSlice = currentGuessedWord.slice(0, idx);
          let presentLetterCount = solution
            .split("")
            .filter((x) => x === letter).length;
          if (letter === solution[idx]) {
            return "correct";
          } else {
            if (solution.includes(letter)) {
              if (!currentSlice.includes(letter)) {
                return "present";
              } else {
                let currentSlicePresentCount = currentSlice
                  .split("")
                  .filter((x) => x === letter).length;
                if (currentSlicePresentCount < presentLetterCount) {
                  return "present";
                } else {
                  return "absent";
                }
              }
            } else {
              return "absent";
            }
          }
        });
        let updatedGuess = {
          ...currentGuess,
          matches,
          isComplete: true,
          isCorrect: false,
        };
        let updatedGuesses = guesses.map((guess, idx) => {
          if (idx === currentGuessIndex) return updatedGuess;
          else return guess;
        });
        dispatch(setGuesses(updatedGuesses));
        dispatch(setCurrentGuessIndex(currentGuessIndex + 1));
        handleFoundKeysOnKeyboard(updatedGuess);
      } else {
        alert("Not in word list");
      }
    }
  };

  const handleGuess = (keyPressed: string) => {
    let currentGuess = guesses[currentGuessIndex];
    if (keyPressed !== "Enter" && !currentGuess.isComplete) {
      updateGuess(keyPressed, currentGuess);
    } else if (keyPressed === "Enter" && !gameWon) {
      checkGuess(currentGuess);
    }
  };

  const resetGameState = () => {
    dispatch(setGuesses([...initialGuesses]));
  };

  const resetGame = () => {
    lottieRef.current?.reset();
    resetGameState();
    dispatch(setCurrentGuessIndex(0));
    dispatch(setUsedKeys([]));
    dispatch(setGameWon(false));
    dispatch(setSolution(answers[Math.floor(Math.random() * answers.length)]));
  };

  return (
    <View style={{ position: "relative" }}>
      <GameBoard
        answer={solution}
        handleGuess={handleGuess}
        resetGame={resetGame}
      />
      <AnimatedLottieView
        ref={lottieRef}
        style={{
          width: SIZE,
          height: HEIGHT * 0.5,
          backgroundColor: "transparent",
          position: "absolute",
          zIndex: 10,
          top: 20,
        }}
        source={require("../lottie/confetti.json")}
      />
    </View>
  );
}

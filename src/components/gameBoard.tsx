import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Keyboard from "./keyboard";
import LetterSquare from "./letterSquare";

import { useAppSelector } from "../hooks/storeHooks";

import { HEIGHT, SIZE } from "../utils/constants";

interface GameBoardProps {
  answer: string;
  handleGuess: (keyPressed: string) => void;
  resetGame: () => void;
}

const GameBoard = ({ answer, handleGuess, resetGame }: GameBoardProps) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const { guesses } = useAppSelector((state) => state.gameState);
  return (
    <View style={styles.board}>
      <View style={styles.blocksContainer}>
        {guesses.map((guess, idx) => (
          <View key={idx} style={styles.squareBlock}>
            {guess.letters.map((letter, idx) => {
              return (
                <LetterSquare
                  key={idx}
                  idx={idx}
                  letter={letter}
                  guess={guess}
                />
              );
            })}
          </View>
        ))}
      </View>
      <Keyboard handleGuess={handleGuess} />
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Button title="Reset Game" onPress={resetGame} />
        <Button
          title="Show Answer"
          onPress={() => setShowAnswer((prev) => !prev)}
        />
        {showAnswer && (
          <Text style={{ marginLeft: 5, color: "white" }}>{answer}</Text>
        )}
      </View>
    </View>
  );
};

export default GameBoard;

const styles = StyleSheet.create({
  board: {
    width: SIZE,
    height: HEIGHT,
    backgroundColor: "#282828",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  keyboard: {
    width: SIZE,
    height: HEIGHT * 0.4,
    backgroundColor: "tomato",
  },
  squareBlock: {
    width: SIZE * 0.9,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  blocksContainer: {
    width: SIZE * 0.9,
    height: HEIGHT * 0.5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

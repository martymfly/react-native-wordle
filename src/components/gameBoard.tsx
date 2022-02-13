import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAppSelector } from "../hooks/storeHooks";
import { HEIGHT, SIZE } from "../utils/constants";
import Keyboard from "./keyboard";

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
              const matchStatus = guess.matches[idx];
              const matchColor =
                matchStatus === "correct"
                  ? "#6aaa64"
                  : matchStatus === "present"
                  ? "#c9b458"
                  : matchStatus === "absent"
                  ? "#939598"
                  : "white";
              return (
                <View
                  key={idx}
                  style={{
                    ...styles.square,
                    backgroundColor: matchColor,
                    borderWidth: guess.isComplete ? 0 : 1,
                  }}
                >
                  <Text
                    style={{
                      ...styles.letter,
                      color: guess.isComplete ? "white" : "black",
                    }}
                  >
                    {letter}
                  </Text>
                </View>
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
        {showAnswer && <Text>{answer}</Text>}
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
  square: {
    width: SIZE / 7,
    height: SIZE / 7,
    borderWidth: 2,
    borderColor: "gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  letter: {
    fontSize: SIZE / 12,
    fontWeight: "bold",
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
});

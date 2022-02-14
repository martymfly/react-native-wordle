import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors, SIZE } from "../utils/constants";
import { useAppSelector } from "../hooks/storeHooks";

const keys: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["<", "z", "x", "c", "v", "b", "n", "m", "Enter"],
];

interface KeyboardProps {
  handleGuess: (keyPressed: string) => void;
}

export default function Keyboard({ handleGuess }: KeyboardProps) {
  const { usedKeys } = useAppSelector((state) => state.gameState);
  const handleKeyboardKeyColor = (key: string) => {
    const keyData = usedKeys[key];
    if (keyData) {
      if (keyData === "correct") {
        return colors.correct;
      } else if (keyData === "present") {
        return colors.present;
      } else if (keyData === "absent") {
        return colors.absent;
      } else return colors.keyDefault;
    } else return colors.keyDefault;
  };
  return (
    <View style={styles.keyboardContainer}>
      {keys.map((keysRow, idx) => (
        <View key={idx} style={styles.keyboardRow}>
          {keysRow.map((keyboardKey) => {
            return (
              <TouchableOpacity
                key={keyboardKey}
                style={{
                  ...styles.keyContainer,
                  backgroundColor: handleKeyboardKeyColor(keyboardKey),
                  width:
                    keyboardKey === "<" || keyboardKey === "Enter"
                      ? (SIZE * 3) / 11 / 2
                      : SIZE / 11,
                }}
                onPress={() => handleGuess(keyboardKey)}
              >
                <Text
                  style={{
                    ...styles.keyboardKey,
                    fontSize: keyboardKey === "Enter" ? 10 : 18,
                  }}
                >
                  {keyboardKey}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {},
  keyboardRow: {
    width: SIZE,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  keyContainer: {
    height: SIZE / 11 + 20,
    margin: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardKey: {
    textTransform: "uppercase",
    color: "white",
    fontFamily: "Montserrat_800ExtraBold",
  },
});

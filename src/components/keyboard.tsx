import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SIZE } from "../utils/constants";

const keys: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["<", "z", "x", "c", "v", "b", "n", "m", "Enter"],
];

interface KeyboardProps {
  handleGuess: (keyPressed: string) => void;
}

export default function Keyboard({ handleGuess }: KeyboardProps) {
  return (
    <View style={{ height: 200 }}>
      {keys.map((keysRow, idx) => (
        <View key={idx} style={styles.keyboardRow}>
          {keysRow.map((keyboardKey) => {
            return (
              <TouchableOpacity
                key={keyboardKey}
                style={{
                  ...styles.keyContainer,
                  width:
                    keyboardKey === "<" || keyboardKey === "Enter"
                      ? (SIZE * 3) / 11 / 2
                      : SIZE / 11,
                }}
                onPress={() => handleGuess(keyboardKey)}
              >
                <Text style={styles.keyboardKey}>{keyboardKey}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardRow: {
    width: SIZE,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  keyContainer: {
    height: SIZE / 11 + 15,
    borderWidth: 1,
    borderColor: "gray",
    margin: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardKey: {
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
});

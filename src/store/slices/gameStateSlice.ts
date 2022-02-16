import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { guess, matchingUsedKey } from "../../types";
import { answers, initialGuesses } from "../../utils/constants";

interface gameState {
  solution: string;
  guesses: guess[];
  currentGuessIndex: number;
  usedKeys: matchingUsedKey;
  gameEnded: boolean;
  gameWon: boolean;
  wrongGuessShake: boolean;
}

const initialState: gameState = {
  solution: answers[Math.floor(Math.random() * answers.length)],
  guesses: [...initialGuesses],
  currentGuessIndex: 0,
  usedKeys: {},
  gameEnded: false,
  gameWon: false,
  wrongGuessShake: false,
};

export const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setSolution: (state, action) => {
      state.solution = action.payload;
    },
    setGuesses: (state, action) => {
      state.guesses = action.payload;
    },
    setCurrentGuessIndex: (state, action) => {
      state.currentGuessIndex = action.payload;
    },
    setUsedKeys: (state, action) => {
      state.usedKeys = action.payload;
    },
    setGameEnded: (state, action) => {
      state.gameEnded = action.payload;
    },
    setGameWon: (state, action) => {
      state.gameWon = action.payload;
    },
    setWrongGuessShake: (state, action) => {
      state.wrongGuessShake = action.payload;
    },
  },
});

export const {
  setSolution,
  setGuesses,
  setCurrentGuessIndex,
  setUsedKeys,
  setGameEnded,
  setGameWon,
  setWrongGuessShake,
} = gameStateSlice.actions;

export const gameState = (state: RootState) => state.gameState;

export default gameStateSlice.reducer;

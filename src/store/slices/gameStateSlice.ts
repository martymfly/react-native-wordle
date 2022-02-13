import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { guess } from "../../types";
import { answers, initialGuesses } from "../../utils/constants";

interface gameState {
  guesses: guess[];
  gameWon: boolean;
  currentGuessIndex: number;
  solution: string;
}

const initialState: gameState = {
  guesses: [...initialGuesses],
  gameWon: false,
  currentGuessIndex: 0,
  solution: answers[Math.floor(Math.random() * answers.length)],
};

export const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    updateGuesses: (state, action) => {
      state.guesses = action.payload;
    },
    setCurrentGuessIndex: (state, action) => {
      state.currentGuessIndex = action.payload;
    },
    setSolution: (state, action) => {
      state.solution = action.payload;
    },
    setGameWon: (state, action) => {
      state.gameWon = action.payload;
    },
  },
});

export const { updateGuesses, setCurrentGuessIndex, setSolution, setGameWon } =
  gameStateSlice.actions;

export const gameState = (state: RootState) => state.gameState;

export default gameStateSlice.reducer;

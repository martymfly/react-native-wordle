import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';
import { guess, matchingUsedKey } from '../../types';
import { initialGuesses } from '../../utils/constants';

interface gameState {
  solution: string;
  guesses: guess[];
  currentGuessIndex: number;
  usedKeys: matchingUsedKey;
  gameStarted: boolean;
  gameEnded: boolean;
  gameWon: boolean;
  wrongGuessShake: boolean;
  gameLanguage: string;
}

const initialState: gameState = {
  solution: '',
  guesses: [...initialGuesses],
  currentGuessIndex: 0,
  usedKeys: {},
  gameStarted: false,
  gameEnded: false,
  gameWon: false,
  wrongGuessShake: false,
  gameLanguage: 'en',
};

export const gameStateSlice = createSlice({
  name: 'gameState',
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
    setGameStarted: (state, action) => {
      state.gameStarted = action.payload;
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
    setGameLanguage: (state, action) => {
      state.gameLanguage = action.payload;
    },
  },
});

export const {
  setSolution,
  setGuesses,
  setCurrentGuessIndex,
  setUsedKeys,
  setGameStarted,
  setGameEnded,
  setGameWon,
  setWrongGuessShake,
  setGameLanguage,
} = gameStateSlice.actions;

export const gameState = (state: RootState) => state.gameState;

export default gameStateSlice.reducer;

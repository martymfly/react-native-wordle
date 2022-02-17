import { configureStore } from '@reduxjs/toolkit';

import gameStateSlice from './slices/gameStateSlice';
import themeSlice from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    gameState: gameStateSlice,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

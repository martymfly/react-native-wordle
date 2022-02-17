import { Dimensions } from 'react-native';

import { guess } from '../types';

export const { width: SIZE, height: HEIGHT } = Dimensions.get('window');

export const colors = {
  correct: '#6aaa64',
  present: '#c9b458',
  absent: '#282828',
  keyDefault: '#606060',
  white: '#ffffff',
  bg: '#121212',
};

export const initialGuesses: guess[] = [
  {
    id: 0,
    letters: ['', '', '', '', ''],
    matches: ['', '', '', '', ''],
    isComplete: false,
    isCorrect: false,
  },
  {
    id: 1,
    letters: ['', '', '', '', ''],
    matches: ['', '', '', '', ''],
    isComplete: false,
    isCorrect: false,
  },
  {
    id: 2,
    letters: ['', '', '', '', ''],
    matches: ['', '', '', '', ''],
    isComplete: false,
    isCorrect: false,
  },
  {
    id: 3,
    letters: ['', '', '', '', ''],
    matches: ['', '', '', '', ''],
    isComplete: false,
    isCorrect: false,
  },
  {
    id: 4,
    letters: ['', '', '', '', ''],
    matches: ['', '', '', '', ''],
    isComplete: false,
    isCorrect: false,
  },
  {
    id: 5,
    letters: ['', '', '', '', ''],
    matches: ['', '', '', '', ''],
    isComplete: false,
    isCorrect: false,
  },
];

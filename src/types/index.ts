export type guess = {
  id: number;
  letters: string[];
  matches: matchStatus[];
  isComplete: boolean;
  isCorrect: boolean;
};

export type matchingUsedKey = {
  [key: string]: matchStatus;
};

export type matchStatus = 'correct' | 'present' | 'absent' | '';

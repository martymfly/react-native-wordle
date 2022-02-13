export type guess = {
  letters: string[];
  matches: matchStatus[];
  isComplete: boolean;
  isCorrect: boolean;
};

export type matchingUsedKey = {
  key: string;
  matchStatus: matchStatus;
};

export type matchStatus = "correct" | "present" | "absent" | "";

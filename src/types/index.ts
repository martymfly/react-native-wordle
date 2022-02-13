export type guess = {
  letters: string[];
  matches: matchStatus[];
  isComplete: boolean;
  isCorrect: boolean;
};

export type matchStatus = "correct" | "present" | "absent" | "";

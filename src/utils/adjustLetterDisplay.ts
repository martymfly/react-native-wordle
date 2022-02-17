export const adjustLetterDisplay = (
  letter: string,
  gameLanguage: string
): string => {
  switch (letter) {
    case 'i':
      return gameLanguage === 'tr' ? 'İ' : letter;
    default:
      return letter;
  }
};

export const adjustTextDisplay = (
  text: string,
  gameLanguage: string
): string => {
  return text
    .split('')
    .map((letter) => adjustLetterDisplay(letter, gameLanguage))
    .join('');
};

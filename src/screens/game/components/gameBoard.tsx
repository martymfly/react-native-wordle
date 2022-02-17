import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// eslint-disable-next-line
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useAppSelector } from '../../../hooks/storeHooks';
import { adjustTextDisplay } from '../../../utils/adjustLetterDisplay';
import { colors, HEIGHT, SIZE } from '../../../utils/constants';
import Keyboard from './keyboard';
import LetterSquare from './letterSquare';

interface GameBoardProps {
  solution: string;
  handleGuess: (keyPressed: string) => void;
  resetGame: () => void;
}

const GameBoard = ({ solution, handleGuess, resetGame }: GameBoardProps) => {
  const { guesses, gameEnded, wrongGuessShake, gameLanguage } = useAppSelector(
    (state) => state.gameState
  );

  return (
    <View style={styles.board}>
      <View style={styles.blocksContainer}>
        {guesses.map((guess, idx) => (
          <View key={idx} style={styles.squareBlock}>
            {guess.letters.map((letter, idx) => {
              return (
                <LetterSquare
                  key={idx}
                  idx={idx}
                  letter={letter}
                  guess={guess}
                />
              );
            })}
          </View>
        ))}
      </View>
      <View style={styles.gameResult}>
        {gameEnded && (
          <>
            <Text style={styles.solutionText}>
              Solution: {adjustTextDisplay(solution, gameLanguage)}
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => resetGame()}
            >
              <Text style={styles.resetButtonText}>New Game</Text>
            </TouchableOpacity>
          </>
        )}
        {wrongGuessShake && (
          <Animated.Text
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.wrongGuessText}
          >
            Not in word list
          </Animated.Text>
        )}
      </View>
      <Keyboard handleGuess={handleGuess} />
    </View>
  );
};

export default GameBoard;

const styles = StyleSheet.create({
  board: {
    width: SIZE,
    height: HEIGHT,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  squareBlock: {
    width: SIZE * 0.9,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  blocksContainer: {
    width: SIZE * 0.9,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  gameResult: {
    width: SIZE,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resetButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#404040',
  },
  resetButtonText: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
    color: '#fff',
  },
  solutionText: {
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  wrongGuessText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
    color: colors.white,
  },
});

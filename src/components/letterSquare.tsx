import { useEffect } from "react";
import { StyleSheet, Text, Vibration } from "react-native";
import Animated, {
  SlideInRight,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
  useDerivedValue,
} from "react-native-reanimated";
import interpolateColorBugFix from "../utils/interpolateColorFix";

import { colors, SIZE } from "../utils/constants";
import { guess } from "../types";

interface LetterSquareProps {
  guess: guess;
  letter: string;
  idx: number;
}

const LetterSquare = ({ guess, letter, idx }: LetterSquareProps) => {
  const scale = useSharedValue(1);
  const rotateDegree = useSharedValue(0);
  const progress = useDerivedValue(() => {
    return guess.isComplete
      ? withDelay(250 * idx, withTiming(1))
      : withDelay(250 * idx, withTiming(0));
  }, [guess]);
  const matchStatus = guess.matches[idx];
  function matchColor() {
    "worklet";
    switch (matchStatus) {
      case "correct":
        return colors.correct;
      case "present":
        return colors.present;
      case "absent":
        return colors.absent;
      case "":
        return colors.white;
      default:
        return colors.white;
    }
  }

  const bgStyle = useAnimatedStyle(() => {
    const colorByMatch = matchColor();
    const backgroundColor = interpolateColorBugFix(
      progress.value,
      [0, 1],
      [colors.white, colorByMatch]
    );

    return { backgroundColor };
  });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotateY: `${rotateDegree.value}deg` },
      ],
    };
  });
  useEffect(() => {
    if (letter !== "" && matchStatus === "") {
      scale.value = withTiming(1.2, {
        duration: 50,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
      Vibration.vibrate(1);
      scale.value = withDelay(50, withTiming(1));
    }
    if (matchStatus !== "") {
      rotateDegree.value = withDelay(
        250 * idx,
        withTiming(90, {
          duration: 250,
        })
      );
      rotateDegree.value = withDelay(
        250 * (idx + 1),
        withTiming(0, {
          duration: 250,
        })
      );
    }
  }, [letter, matchStatus]);
  return (
    <Animated.View
      entering={SlideInRight}
      key={idx}
      style={[
        {
          ...styles.square,
          backgroundColor: matchColor(),
          borderWidth: guess.isComplete ? 0 : 1,
        },
        animatedStyles,
        bgStyle,
      ]}
    >
      <Text
        style={{
          ...styles.letter,
          color: guess.isComplete ? "white" : "black",
        }}
      >
        {letter}
      </Text>
    </Animated.View>
  );
};

export default LetterSquare;

const styles = StyleSheet.create({
  square: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: SIZE / 6.2,
    height: SIZE / 6.2,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
  },
  letter: {
    fontSize: SIZE / 12,
    fontWeight: "bold",
    fontFamily: "Montserrat_800ExtraBold",
    textTransform: "uppercase",
  },
});

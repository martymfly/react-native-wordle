// https://github.com/software-mansion/react-native-reanimated/issues/2826#issue-1099818705
/* eslint-disable */
// @ts-nocheck
import { interpolate } from 'react-native-reanimated';

function hexToRGBA(hw: string) {
  'worklet';
  if (hw.length === 4) {
    return {
      r: parseInt(hw.substr(1, 1), 16),
      g: parseInt(hw.substr(2, 1), 16),
      b: parseInt(hw.substr(3, 1), 16),
      a: 1,
    };
  }
  const r = parseInt(hw.slice(1, 3), 16);
  const g = parseInt(hw.slice(3, 5), 16);
  const b = parseInt(hw.slice(5, 7), 16);
  const a = hw.length === 9 ? parseInt(hw.slice(7, 9), 16) / 255 : 1;

  return {
    r,
    g,
    b,
    a,
  };
}

function colorToRGBA(
  color:
    | string
    | { r: number; g: number; b: number }
    | { r: number; g: number; b: number; a: number }
) {
  'worklet';
  if (typeof color === 'string') {
    if (color.startsWith('rgba(')) {
      const colorProcessed = color.split('(')[1].split(')')[0].split(',');
      return {
        r: parseInt(colorProcessed[0].trim()),
        g: parseInt(colorProcessed[1].trim()),
        b: parseInt(colorProcessed[2].trim()),
        a: parseInt(colorProcessed[3].trim()),
      };
    } else if (color.startsWith('rgb(')) {
      const colorProcessed = color.split('(')[1].split(')')[0].split(',');
      return {
        r: parseInt(colorProcessed[0].trim()),
        g: parseInt(colorProcessed[1].trim()),
        b: parseInt(colorProcessed[2].trim()),
        a: 1,
      };
    } else {
      return hexToRGBA(color);
    }
  } else {
    return {
      r: color.r,
      g: color.g,
      b: color.b,
      a: Object.keys(color).includes('a') ? color.a : 1,
    };
  }
}

export default function interpolateColorBugFix(
  value: number,
  inputRange: readonly number[],
  outputRange: readonly (string | number)[]
) {
  'worklet';
  const outputRangeProcessed = outputRange.map((i) => colorToRGBA(i as string));
  const values = {
    r: interpolate(
      value,
      inputRange,
      outputRangeProcessed.map((i) => i.r)
    ),
    g: interpolate(
      value,
      inputRange,
      outputRangeProcessed.map((i) => i.g)
    ),
    b: interpolate(
      value,
      inputRange,
      outputRangeProcessed.map((i) => i.b)
    ),
    a: interpolate(
      value,
      inputRange,
      outputRangeProcessed.map((i) => i.a)
    ),
  };
  return `rgba(${values.r},${values.g},${values.b}, ${values.a})`;
}

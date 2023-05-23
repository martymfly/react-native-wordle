import { Button, View, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';

import {
  setGameLanguage,
  setGameStarted,
} from '../../store/slices/gameStateSlice';
import { setStoreData } from '../../utils/localStorageFuncs';
import { useState } from 'react';
import { colors } from '../../utils/constants';

export default function Settings() {
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    dispatch(setGameLanguage(value));
    setStoreData('language', value);
    resetGame();
  };

  const resetGame = () => {
    dispatch(setGameStarted(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a language : {selectedLanguage}</Text>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={handleLanguageChange}
        style={styles.picker}
        itemStyle={{ color: 'white' }}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Turkish" value="tr" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // backgroundColor: 'white',
  },
  label: {
    fontSize: 28,
    marginBottom: 10,
    color: colors.white,
  },
  picker: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
});

import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import { useAppSelector } from '../../hooks/storeHooks';
import MainNavigator from '../../navigation/mainNavigator';

export default function MainScreen() {
  const { theme } = useAppSelector((state) => state.theme);
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer theme={theme.dark ? DarkTheme : DefaultTheme}>
      <MainNavigator />
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

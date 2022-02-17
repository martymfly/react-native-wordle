import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { store } from './src/store';
import MainScreen from './src/screens/main';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}

import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import MainNavigator from "../navigation/mainNavigator";
import { useAppSelector } from "../hooks/storeHooks";

export default function MainScreen() {
  const { theme } = useAppSelector((state) => state.theme);
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer theme={theme.dark ? DarkTheme : DefaultTheme}>
      <MainNavigator />
      <StatusBar style={theme.dark ? "light" : "dark"} />
    </NavigationContainer>
  );
}

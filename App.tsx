import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import Constants from "expo-constants";
import Game from "./src/screens/game";
import { store } from "./src/store";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Game />
        <StatusBar backgroundColor="#282828" style="light" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
});

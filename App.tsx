import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import Constants from "expo-constants";
import Game from "./src/screens/game";
import { store } from "./src/store";

export default function App() {
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

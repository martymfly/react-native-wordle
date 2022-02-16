import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import Game from "./src/screens/game";
import Settings from "./src/screens/settings";
import { store } from "./src/store";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./src/utils/constants";

const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <NavigationContainer theme={DarkTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: React.ComponentProps<typeof Ionicons>["name"] =
                "game-controller";

              if (route.name === "Game") {
                iconName = focused
                  ? "game-controller"
                  : "game-controller-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "settings" : "settings-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Game" component={Game} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
        <StatusBar backgroundColor={colors.bg} style="light" />
      </NavigationContainer>
    </Provider>
  );
}

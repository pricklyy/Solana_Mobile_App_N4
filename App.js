
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
//import thư viện navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./configs/authContext";
import { QuizHistoryProvider } from "./configs/QuizHistoryContext";
const Stack = createNativeStackNavigator();
import ManHinhDangNhap from "./views/SignIn";
import ManHinhDangKy from "./views/SignUp";
import ManHinhHome from "./views/MainContainer";
import GameDetail from "./views/GameDetail";
import StartQuizz from "./views/StartQuizz";
import ResultQuizz from "./views/ResultQuizz";
import HomeScreenApp from "./views/HomeScreenApp";
import QuizScreen from "./views/QuizScreen";
import RankScreen from "./views/RankScreen";
import ChangeCapcha from "./views/ChangeCapcha";
import ChangePassW from "./views/ChangePassW";
import InfoDetail from "./views/InfoDeteil";
import ChangeEmail from "./views/ChangeEmail";
import { HomeScreen } from "./src/screens";
import { HomeNavigator } from "./src/navigators/HomeNavigator";
import { AppNavigator } from "./src/navigators/AppNavigator";
import { SettingsScreen } from "./src/screens";
import "./src/polyfills";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConnectionProvider } from "./src/utils/ConnectionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import { ClusterProvider } from "./src/components/cluster/cluster-data-access";
const queryClient = new QueryClient();


export default function App() {
  const colorScheme = useColorScheme();
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
    },
  };
  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
    },
  };
  return (
    <NavigationContainer>
      <AuthProvider>
        <QuizHistoryProvider>
          <QueryClientProvider client={queryClient}>
            <ClusterProvider>
              <ConnectionProvider config={{ commitment: "processed" }}>
                <PaperProvider>
                <Stack.Navigator initialRouteName='Màn Hình Đăng Nhập' screenOptions={{ headerShown: false, gestureEnabled: false }}>
                  <Stack.Screen name='Màn Hình Đăng Nhập' component=
                    {ManHinhDangNhap} />
                  <Stack.Screen name='Màn Hình Đăng Ký' component={ManHinhDangKy} />
                  <Stack.Screen name='Màn Hình Chính' component={ManHinhHome} />
                  <Stack.Screen name="GameDetail" component={GameDetail} />
                  <Stack.Screen name="StartQuizz" component={StartQuizz} />
                  <Stack.Screen name="ResultScreen" component={ResultQuizz} />
                  <Stack.Screen name="Home" component={HomeScreenApp} />
                  <Stack.Screen name="QuizScreen" component={QuizScreen} />
                  <Stack.Screen name="RankScreen" component={RankScreen} />
                  <Stack.Screen name="ChangeCapcha" component={ChangeCapcha} />
                  <Stack.Screen name="ChangePassW" component={ChangePassW} />
                  <Stack.Screen name="InfoDetail" component={InfoDetail} />
                  <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
                  {/*  */}
                  <Stack.Screen name="HomeWall" component={HomeScreen} />
                  <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
                  <Stack.Screen name="AppNavigator" component={AppNavigator} />
                  {/* <Stack.Screen name="SettingScreen" component={SettingsScreen} /> */}
                  <Stack.Screen name="Settings" component={SettingsScreen} />
                  {/* <Stack.Screen name="WalletScreen" component={WalletScreen} /> */}
                
                </Stack.Navigator>
                </PaperProvider>
              </ConnectionProvider>
            </ClusterProvider>
          </QueryClientProvider>

        </QuizHistoryProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
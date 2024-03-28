import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreenApp";
import QuizScreen from "./QuizScreen"
import RankScreen from "./RankScreen";
import InfoUserScreen from "./InfoUserScreen";
import ResultScreen from "./ResultScreen";
import DiemThuongScreen  from "./DiemThuongScreen";
const Tab = createBottomTabNavigator();
export default function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="History Take Quiz" 
        component={QuizScreen} 
        options={{
          tabBarLabel: 'History', 
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Reward Gift"
        component={DiemThuongScreen}
        options={{
          tabBarLabel: 'Reward',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="gift-open-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Rank"
        component={RankScreen}
        options={{
          tabBarLabel: 'Rank',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="medal-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Info User"
        component={InfoUserScreen}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
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

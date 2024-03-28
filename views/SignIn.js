import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../configs/authContext";
import { API_LOGIN } from '../configs/api-config';

export default function SignIn() {
  const navigation = useNavigation();
  const { setUser, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setPassword("");
  }, []);

  const login = async () => {
    try {
      const response = await fetch(`${API_LOGIN}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setUser(data.user);
        navigation.navigate("Màn Hình Chính");
      } else {
        Alert.alert("Thông báo!", "Tài khoản hoặc Mật khẩu không đúng", [
          {
            text: "OK",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setPassword(""); 
    logout();
  };


  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%" }}
        source={require("../assets/frame_11.png")}
      />
      <Text style={{ fontSize: 38, textAlign: "center", marginTop: 10 }}>
        Welcome Back
      </Text>
      <Text style={{ fontSize: 20, textAlign: "center", color: "#969696" }}>
        Sign to countinue
      </Text>

      <TextInput
        style={{
          width: 360,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#000000",
          borderWidth: 0.5,
          height: 40,
          padding: 10,
          margin: 15,
          alignSelf: "center",
        }}
        placeholder="Email"
        onChangeText={(txt) => {
          setEmail(txt);
        }}
      />

      <TextInput
        style={{
          width: 360,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#000000",
          borderWidth: 0.5,
          height: 40,
          padding: 10,
          margin: 15,
          alignSelf: "center",
        }}
        placeholder="Password"
        onChangeText={(txt) => {
          setPassword(txt);
        }}
        secureTextEntry={true}
        value={password}
      />

      <TouchableOpacity
        style={{
          width: 360,
          backgroundColor: "#F46535",
          height: 45,
          alignSelf: "center",
          borderRadius: 10,
          justifyContent: "center",
        }}
        // onPress={() => {
        //   navigation.navigate("Màn Hình Chính");

        // }}
        onPress={() => {
          login(email, password);
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 22, color: "#FFF" }}>
          Sign In
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          width: 360,
          alignSelf: "center",
          marginTop: 20,
          justifyContent: "space-evenly",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            fontWeight: "300",
            justifyContent: "center",
          }}
        >
          Don't have account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Màn Hình Đăng Ký')
          }}

        >
          <Text style={{ fontSize: 18, color: "#F46535", textAlign: "center" }}>
            Create a new account.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  topHeader: {
    width: "100%",
    height: 400,
    backgroundColor: "#F46535",
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
});

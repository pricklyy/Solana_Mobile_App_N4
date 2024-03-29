import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
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
    <ScrollView
      style={{
        opacity: 50
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row'
        }}>
        <View
          style={{
            height: 150,
            width: 150,
            backgroundColor: '#5daef2',
            borderRadius: 750,
            top: -75,
            left: 150
          }} />
        <View
          style={{
            height: 300,
            width: 300,
            backgroundColor: '#0d0dd9',
            borderRadius: 150,
            top: -100,
            left: -200
          }}>
          <Text
            style={[styles.txt, {
              top: 150,
              left: 60,
              color: 'white'
            }]}>Xin Chào,{'\n'}     Mời đăng nhập</Text>
        </View>

      </View>

      {/* View textinput tài khoản mật khẩu */}
      <View
        style={{
          flex: 2,
        }}>
        <Text
          style={styles.txt}>Tài Khoản</Text>
        <TextInput
          onChangeText={(txt) => {
            setEmail(txt);
          }}
          style={styles.txtInput}
          placeholder='example@gmail.com' />


        <Text style={[styles.txt, { marginTop: 5 }]}>Mật khẩu</Text>
        <TextInput
          onChangeText={(txt) => {
            setPassword(txt);
          }}
          style={styles.txtInput}
          secureTextEntry={true}
          placeholder='Mật khẩu có 6 kí tự trở lên' />

        <TouchableOpacity
          onPress={() => {
            login(email, password);
          }}
          style={[styles.btnLogin, {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            borderRadius: 15
          }]}>
          <Text style={[styles.txt,
          {
            fontSize: 24,
            marginRight: 10,
            color: 'white',
          }
          ]}>Đăng nhập</Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Màn Hình Đăng Ký')
            }}>
            <Text
              style={{
              }}>Chưa có tài khoản, đăng ký ở đây</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  txtInput: {
    borderWidth: 2,
    marginHorizontal: 10,
    height: 60,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  txt: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10
  },
  btnLogin: {
    margin: 10,
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "blue"
  }
});

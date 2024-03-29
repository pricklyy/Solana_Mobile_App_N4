import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from 'react-native'
import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react'
import { API_Register } from '../configs/api-config';

export default function SignUp() {
  const navigation = useNavigation();

  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [avatar, setavatar] = useState('')

  const handleRegister = async () => {
    try {
      const randomNumber = Math.floor(Math.random() * 10000000000);
      const randomString = Math.random().toString(36).substring(7);

      const response = await fetch(API_Register, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          avatar: avatar,
          solanaAddress: randomString
        }),
      });

      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        ToastAndroid.show(message, ToastAndroid.LONG);
        console.error(message);
        return;
      }

      if (response.status === 200) {
        console.log("response: " + response.status);
        ToastAndroid.show('Đăng ký thành công', ToastAndroid.LONG);
        navigation.replace('Màn Hình Đăng Nhập');

        return;
      }

    } catch (e) {
      console.error(e);
      ToastAndroid.show('An error occurred.', ToastAndroid.LONG);
    }
  }

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          height: 230
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
            }]}>Tạo,{'\n'}     Tài Khoản</Text>
        </View>


      </View>

      {/* View textinput tài khoản mật khẩu */}
      <View
        style={{
          flex: 2,
        }}>
        <Text
          style={styles.txt}>Họ Tên</Text>
        <TextInput
          onChangeText={(txt) => setusername(txt)}
          style={[styles.txtInput]}
          placeholder='Nhập họ tên' />

        <Text
          style={styles.txt}>Avatar</Text>
        <TextInput
          onChangeText={(txt) => setavatar(txt)}
          style={[styles.txtInput]}
          placeholder='Link avatar' />

        <Text
          style={styles.txt}>Tài Khoản</Text>
        <TextInput
          onChangeText={(txt) => setemail(txt)}
          style={styles.txtInput}
          placeholder='example@gmail.com' />

        <Text style={[styles.txt, { marginTop: 5 }]}>Mật khẩu</Text>
        <TextInput
          onChangeText={(txt) => setpassword(txt)}
          style={styles.txtInput}
          secureTextEntry={true}
          placeholder='Mật khẩu có 6 kí tự trở lên' />

        <Text
          style={styles.txt}>Nhập lại mật khẩu</Text>
        <TextInput
          style={[styles.txtInput]}
          secureTextEntry={true}
          placeholder='Enter your re-password' />
        <TouchableOpacity
          onPress={handleRegister}
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
          ]}>Đăng Ký</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
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
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'black',
  },
  txt: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black'
  },
  btnLogin: {
    margin: 10,
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'blue'
  }
})
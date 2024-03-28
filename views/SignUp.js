import { StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity, } from 'react-native'
  import { useNavigation } from '@react-navigation/native';

import React from 'react'

export default function SignUp() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%" }}
        source={require("../assets/frame_11.png")}
      />
      <Text style={{ fontSize: 38, textAlign: "center", marginTop: 10 }}>
        Create Account
      </Text>
      <Text style={{ fontSize: 20, textAlign: "center", color: "#969696" }}>
        Create a new account
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
        placeholder="Username"
        onChangeText={(txt) => {
          // setUsername(txt);
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
          // setUsername(txt);
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
        placeholder="Confirm Password"
        onChangeText={(txt) => {
          // setUsername(txt);
        }}
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
      >
        <Text style={{ alignSelf: "center", fontSize: 22, color: "#FFF" }}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          width: 360,
          alignSelf: "center",
          marginTop: 20,
          justifyContent:"center"
        }}
      >
        <Text style={{ fontSize: 18, textAlign: "center",fontWeight:"300" ,justifyContent:"center"}}>
          Already have an account?
        </Text>
        <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}>
          <Text style={{ fontSize: 18, color: "#F46535", textAlign: "center", marginLeft: 5}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
})
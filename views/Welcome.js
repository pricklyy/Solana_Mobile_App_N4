import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, ScrollView, ImageBackground, Image } from 'react-native'

const Welcome = (props) => {
  const { navigation, route } = props;
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <ImageBackground
        resizeMode="cover"
        style={{
          flex: 1,
          alignItems: 'center',
        }}
        source={require('../assets/Space-Background-Images.jpg')}>
        <View
          style={{
            marginTop: 60
          }}>
          <Text
            style={{
              padding: 30,
              color: 'white',
              fontSize: 35,
              fontWeight: 'bold'
            }}>Chào mừng đến với ứng dụng cộng điểm thưởng</Text>
        </View>
        <View
          style={{

            marginTop: 60
          }}>
          <Text
            style={{
              padding: 30,
              color: 'white',
              fontSize: 35,
              fontWeight: 'bold'
            }}></Text>
        </View>
        <View
          style={{
            width: '95%',
            flex: 1,
            backgroundColor: 'gray',
            marginHorizontal: 10,
            marginBottom: 10,
            marginTop: 60,
            borderRadius: 50,
            opacity: 0.3,
          }}>
        </View>
        <View
          style={{

            top: 480,
            position: 'absolute',
          }}>
          <Text
            style={{
              textAlign: 'center',

              padding: 30,
              color: 'white',
              fontSize: 35,
              fontWeight: 'bold'
            }}>Kết điểm thưởng, xây dựng cộng đồng vững mạnh</Text>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Màn Hình Đăng Nhập')}
              style={{
                backgroundColor: '#4999ff',
                width: 200,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                opacity: 0.5,
                borderRadius: 25
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: 20
                }}>GET STARTED NOW</Text>
            </TouchableOpacity>

          </View>

        </View>


      </ImageBackground>
    </View>


  )
}

export default Welcome
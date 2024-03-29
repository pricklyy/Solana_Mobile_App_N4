import * as React from "react";
import { useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Color, Border, FontSize } from "../configs/GlobalStyles";
import { useAuth } from "../configs/authContext";
import { useNavigation } from "@react-navigation/native";


const InfoScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [password, setPassword] = useState("");


  const handleLogout = () => {
    setPassword("");
    logout();
    console.log("Đã đăng xuất, chuyển hướng đến màn hình đăng nhập...");
    navigation.reset({
      index: 0,
      routes: [{ name: 'Màn Hình Đăng Nhập' }],
    });
  };

  const handleChangeCapcha = () => {
    navigation.navigate('ChangeCapcha');
  };

  const handleNavigateToInfoDetail = () => {
    navigation.navigate('InfoDetail');
  };

  const handleNavigateWallet = () => {
    navigation.navigate('HomeWall');
  };


  return (
    <View>
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.infoTitle}
          onPress={handleNavigateToInfoDetail}>
          {user && user.avatar && (
            <Image
              style={styles.image8Icon}
              contentFit="cover"
              source={{ uri: user.avatar }}
            />
          )}
          <View
            style={{ marginLeft: 20 }}>
            <Text style={styles.nameTitle}>{user.username}</Text>
            <Text style={styles.emailTitle}>{user.email}</Text>
            <Text>{user.solanaAddress}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginVertical:10 }}>
          <View style={{ borderWidth: 0.5, opacity: 0.5, width: '90%' }} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ChangeEmail')}
          style={{ justifyContent: 'center', marginTop: 10 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Image
              style={[styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/gmail.png")}
            />
            <View style={styles.viewTxtBtn}>
              <Text style={{ fontSize: 16 }}>
                Email
              </Text>
              <Text style={{ opacity: 0.5 }}>
                change your e - mail
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleChangeCapcha}
          style={{ justifyContent: 'center', marginTop: 10 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Image
              style={[styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/reset-password.png")}
            />
            <View style={styles.viewTxtBtn}>
              <Text style={{ fontSize: 16 }}>
                Password and Security
              </Text>
              <Text style={{ opacity: 0.5 }}>
                persional password
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNavigateWallet}
          style={{ justifyContent: 'center', marginVertical: 10 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Image
              style={[styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/phantomicon.png")}
            />
            <View style={styles.viewTxtBtn}>
              <Text style={{ fontSize: 16 }}>
                My Phantom
              </Text>
              <Text style={{ opacity: 0.5 }}>
                connect wallet
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={{ justifyContent: 'center', marginVertical: 10 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Image
            style={[styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/language.png")}
          />
          <View style={styles.viewTxtBtn}>
            <Text style={{ fontSize: 16 }}>
            Change Language
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ justifyContent: 'center', marginVertical: 10 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Image
            style={[styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/help.png")}
          />
          <View style={styles.viewTxtBtn}>
            <Text style={{ fontSize: 16 }}>
              Help
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}
        style={{ justifyContent: 'center', marginVertical: 10 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Image
            style={[styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/logout.png")}
          />
          <View style={styles.viewTxtBtn}>
            <Text style={{ fontSize: 16 }}>
              Logout
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    height: 30,
    width: 30,
    marginLeft: 20
  },
  image8Icon: {
    borderRadius: 70,
    width: 100,
    height: 100,

  },
  InfoScreen: {
    borderRadius: 40,
    flex: 1,
    width: "100%",
    height: 979,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
    marginTop: -90
  },
  infoContainer: {
    width: '100',
    height: 'auto',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10
  },
  infoTitle: {
    margin: 10,
    width: '100%',
    flexDirection: 'row'
  },
  nameTitle: {
    fontSize: 27,
    fontWeight: "bold"
  },
  emailTitle: {
    fontSize: 15,
    opacity: 0.5,
    fontStyle: 'italic'
  },
  viewTxtBtn: {
    marginLeft: 10
  }
});



export default InfoScreen;

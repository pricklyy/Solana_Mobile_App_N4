import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useAuth } from "../configs/authContext";

const InfoDetail = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Information</Text>
      <View style={styles.userInfo}>
        <Image
          style={styles.avatar}
          source={{ uri: user.avatar }}
        />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.email}>{user.solanaAddress}</Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userInfo: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
  },
});

export default InfoDetail;

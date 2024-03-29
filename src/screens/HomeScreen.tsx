import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";

import { Section } from "../Section";
import { useAuthorization } from "../utils/useAuthorization";
import { AccountDetailFeature } from "../components/account/account-detail-feature";
import { SignInFeature } from "../components/sign-in/sign-in-feature";
import { TopBar } from "../components/top-bar/top-bar-feature";

export function HomeScreen() {
  const { selectedAccount } = useAuthorization();

  return (
    <View style={styles.screenContainer}>
      <TopBar />
      <Text
        style={{ fontWeight: "bold", marginBottom: 12 }}
        variant="displaySmall"
      >
        Solana Mobile Expo Template
      </Text>
      {selectedAccount ? (
        <AccountDetailFeature />
      ) : (
        <>
          <Section
            title="Your Phantom"
            description="Kết nối vào ví phantom của bạn"
          />
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <ActivityIndicator size={90} color="#0000ff" style={{ marginTop: 50 }} />
            <Text>Loading</Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <SignInFeature />
          </View>

        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 16,
    flex: 1,
    backgroundColor: "#FFF"
  },
  buttonGroup: {
    flexDirection: "column",
    paddingVertical: 4,
  },
});

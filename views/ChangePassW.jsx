import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { API_CHANGE_PASSWORD } from '../configs/api-config';
import { useAuth } from '../configs/authContext';
import { useNavigation } from '@react-navigation/native';

const ChangePassW = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setErrorMessage('New password and confirm password do not match');
        return;
      }

      const response = await fetch(API_CHANGE_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user ? user._id : null,
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setErrorMessage('');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        Alert.alert(
          'Success',
          'Your password has been changed successfully.',
          [
            {
              text: 'Logout',
              onPress: () => {
                // logout(); // Đăng xuất người dùng
                navigateToLogin(); // Chuyển hướng đến màn hình đăng nhậpư
              
              },
            },
            {
              text: 'OK',
              onPress: () => navigateToHome(),
            },
          ]
        );
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while changing password');
    }
  };

  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Màn Hình Chính' }],
    });
  };

  const navigateToLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Màn Hình Đăng Nhập' }],
    });
  };

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [{ text: 'OK', onPress: () => {} }]);
    }
  }, [errorMessage]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Change Password" onPress={handleChangePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
});

export default ChangePassW;
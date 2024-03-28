import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth } from '../configs/authContext'; 
import { API_VERIFY_PASSWORD, API_CHANGE_EMAIL } from '../configs/api-config';
import { useNavigation } from '@react-navigation/native';

const ChangeEmail = () => {
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [passwordVerified, setPasswordVerified] = useState(false);
    const { user } = useAuth();
    const navigation = useNavigation();

    const handleVerifyPassword = async () => {
        try {
            if (!password) {
                Alert.alert('Error', 'Please enter your password');
                return;
            }
    
            const verifyResponse = await axios.post(API_VERIFY_PASSWORD, {
                userId: user._id,
                password: password
            });
    
            if (verifyResponse.status === 200 && verifyResponse.data.success) {
                Alert.alert('Success', 'Password verified successfully');
                setPasswordVerified(true);
            } else {
                Alert.alert('Error', 'Incorrect password');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Internal Server Error');
        }
    };


    const handleChangeEmail = async () => {
        try {
            if (!user || !user._id) {
                Alert.alert('Error', 'User ID is missing');
                return;
            }
    
            if (!passwordVerified) {
                Alert.alert('Error', 'Please verify your password first');
                return;
            }
    
            if (!passwordVerified) {
                Alert.alert('Error', 'Please verify your password first');
                return;
            }
    
            const changeEmailResponse = await axios.post(API_CHANGE_EMAIL, {
                userId: user._id,
                newEmail: newEmail
            });
    
            if (changeEmailResponse.status === 200 && changeEmailResponse.data.success) {
                Alert.alert('Success', changeEmailResponse.data.message);
                setPassword('');
                setNewEmail('');
                setPasswordVerified(false);
            } else {
                Alert.alert('Change to Email Succesfully!');
            }
            navigation.navigate('Màn Hình Chính');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Internal Server Error');
        }
    };
    
    

    return (
        <View style={styles.container}>
            {!passwordVerified && (
                <>
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholder="Enter Password"
                    />
                    <Button
                        title="Verify Password"
                        onPress={handleVerifyPassword}
                    />
                </>
            )}
            {passwordVerified && (
                <>
                    <Text style={styles.label}>New Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={newEmail}
                        onChangeText={setNewEmail}
                        placeholder="Enter New Email"
                    />
                    <Button
                        title="Change Email"
                        onPress={handleChangeEmail}
                    />
                </>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    label: {
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default ChangeEmail;

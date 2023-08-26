import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        // Perform login logic here

        // Assuming successful login, navigate to Home
        navigation.navigate('Home');
    };

    const handleForgotPassword = () => {
        // Navigate to ForgotPassword screen
        navigation.navigate('Forgot');
    };

    const handleSignUp = () => {
        // Navigate to SignUp screen
        navigation.navigate('Signup');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize="none"
                className="border-2 border-red-500"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText} onPress={handleLogin}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.emailDisplay}>{email}</Text>
            <View style={styles.linksContainer}>
                <TouchableOpacity style={styles.linkButton} onPress={handleForgotPassword}>
                    <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkButton} onPress={handleSignUp}>
                    <Text style={styles.linkText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eed2d6',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'red',
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
        fontSize: 18,
        backgroundColor: '#fff',
        color: 'red',
    },
    loginButton: {
        backgroundColor: '#007bff',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        elevation: 2,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    emailDisplay: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
    },
    linkButton: {
        paddingVertical: 10,
    },
    linkText: {
        fontSize: 16,
        color: '#007bff',
    },
});

export default Login;

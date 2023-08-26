import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const Forgot = () => {
    const [email, setEmail] = useState('');

    const handleResendCode = () => {
        // Logic to resend code to the provided email
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Forgot Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
                <Text style={styles.resendButtonText}>Resend Code</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
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
    },
    resendButton: {
        backgroundColor: 'red',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        elevation: 2,
    },
    resendButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Forgot;

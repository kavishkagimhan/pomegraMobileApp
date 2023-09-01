import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from './AuthProvider';
import farming from "../assets/farming.png"
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const { login } = useContext(AuthContext);


    return (
        <View className='items-center flex-1 w-screen h-screen' >
            <Image source={farming} className="w-screen bg-cover h-[20vh]" />
            <Text className="p-4 text-4xl font-bold text-primary">Login</Text>
            <TextInput
             className="px-2 py-1  text-black bg-white dark:text-black w-[80%] text-lg border border-primary rounded-md "
                placeholder='Enter Email Address'
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize="none"
            />
            <TextInput
             className="px-2 py-1  text-black bg-white dark:text-black w-[80%] text-lg border border-primary rounded-md "
                placeholder='Enter Password'
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Button name='Login' onPress={() => login(email, password)} />
            <TouchableOpacity className="w-[80%] px-2 py-1 bg-primary text-center h-12 items-center mt-6" onPress={() => login(email, password)}>
                <Text className="text-lg font-bold text-white">Login</Text>
            </TouchableOpacity>
            <View className="flex-row gap-16 p-4">
                <TouchableOpacity className="" onPress={() => navigation.navigate('Forgot')}>
                    <Text className="text-lg font-semibold text-primary focus-within:underline">Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity className="" onPress={() => navigation.navigate('Signup')}>
                    <Text className="text-lg font-semibold text-primary focus-within:underline">Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



export default Login;

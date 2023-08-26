import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from './AuthProvider';
import farming from "../assets/farming.png"
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const {login} = useContext(AuthContext);

    
    return (
        <View className='items-center flex-1 w-screen h-screen' >
            <Image source={farming} className="w-screen bg-cover h-[20vh]" />
            <Text className="p-4 text-4xl font-bold text-primary">Login</Text>
            <Input
                placeholder='Enter Email Address'
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize="none"
            />
            <Input
                placeholder='Enter Password'
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Button name='Login' onPress={() => login(email, password)}/>
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

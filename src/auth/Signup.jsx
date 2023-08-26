import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthProvider';
import farming from "../assets/farming.png";
import Button from '../components/Button';
import Input from '../components/Input';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); // Store errors in a state object

    const { register } = useContext(AuthContext);

    const validateForm = () => {
        const newErrors = {};

        if (!email) newErrors.email = 'Email is required';
        else if (!isValidEmail(email)) newErrors.email = 'Invalid email format';
        else newErrors.email = ''; // Clear the error if valid

        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        else newErrors.password = ''; // Clear the error if valid

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSignup = () => {
        if (validateForm()) {
            register(email, password);
        }
    };

    return (
        <View className='items-center flex-1 w-screen h-screen'>
            <Image className="w-screen bg-cover h-[20vh]" source={farming} />
            <Text className="p-4 text-4xl font-bold text-primary">Signup</Text>

            <Input
                placeholder='Enter Email Address'
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize="none"
            />
            {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

            <Input
                placeholder='Enter Password'
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

            <Button name='Signup' onPress={handleSignup} />
            <TouchableOpacity className="w-[80%] px-2 py-1 bg-primary text-center h-12 items-center mt-6" onPress={handleSignup}>
            <Text className="text-lg font-bold text-white">Up</Text>
        </TouchableOpacity>
        </View>
    );
};

export default Signup;
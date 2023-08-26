import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Signup from './Signup';
import Splash from '../screens/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Forgot from './Forgot';

const Stack = createNativeStackNavigator();

const AuthStack = () => {

    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        }); // Add some error handling, also you can simply do setIsFirstLaunch(null)

    }, []);

    if (isFirstLaunch === null) {
        return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
    } else if (isFirstLaunch == true) {
        routeName = 'Splash';
    } else {
        routeName = 'Login';
    }

    return (
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ header: () => null }}
            />

            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ header: () => null }}
            />

            <Stack.Screen
                name="Forgot"
                component={Forgot}
                options={{ header: () => null }}
            />

        </Stack.Navigator>
    )
}

export default AuthStack
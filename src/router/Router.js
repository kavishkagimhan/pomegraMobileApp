import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Splash from '../screens/Splash';
import Forgot from '../auth/Forgot';
import Disease from '../diseases/Disease';
import FindDisease from '../diseases/FindDisease';

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                <Stack.Screen options={{headerShown:false}} name="Home" component={Home} />
                <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
                <Stack.Screen options={{headerShown:false}} name="Signup" component={Signup} />
                <Stack.Screen options={{headerShown:false}} name="Splash" component={Splash} />
                
                <Stack.Screen name="Forgot" component={Forgot} />
                <Stack.Screen name="Disease" component={Disease} />
                <Stack.Screen name="Find" component={FindDisease} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';


import { View, Text, StatusBar } from 'react-native'


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../auth/AuthProvider';
import auth from '@react-native-firebase/auth';
import AuthStack from '../auth/AuthStack';
import AppStack from '../auth/AppStack';

import Home from '../Home';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Splash from '../screens/Splash';
import Forgot from '../auth/Forgot';
import Disease from '../diseases/Disease';
import FindDisease from '../diseases/FindDisease';
import Quality from '../quality/Quality';
import FindQuality from '../quality/FindQuality';
import DiseaseResult from '../diseases/DiseaseResult';
import QualityResult from '../quality/QualityResult';







const Router = () => {

    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (
        // <NavigationContainer>
        //     {/* <Stack.Navigator initialRouteName='Splash'>
        //         <Stack.Screen options={{headerShown:false}} name="Home" component={Home} />
        //         <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
        //         <Stack.Screen options={{headerShown:false}} name="Signup" component={Signup} />
        //         <Stack.Screen options={{headerShown:false}} name="Splash" component={Splash} />

        //         <Stack.Screen name="Forgot" component={Forgot} />
        //         <Stack.Screen name="Disease" component={Disease} />
        //         <Stack.Screen name="FindDisease" component={FindDisease} />
        //         <Stack.Screen name="Quality" component={Quality} />
        //         <Stack.Screen name="FindQualiry" component={FindQuality} />
        //         <Stack.Screen name="DiseaseResult" component={DiseaseResult} />
        //         <Stack.Screen name="QualityResult" component={QualityResult} />
        //     </Stack.Navigator> */}
        //     <AuthStack />
        // </NavigationContainer>
        <NavigationContainer >
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>

    )
}

export default Router
import { View, Text, StyleSheet } from 'react-native';
import React,{useEffect, useState} from 'react';
import { useNavigation} from '@react-navigation/core';

const Splash = () => {

    const [isGo, setIsgo] = useState(true);
    const Navigation = useNavigation();
    
    useEffect(() => {
        if (isGo == true) {
            setTimeout(() =>{
                Navigation.navigate("Login");
                setIsgo(false);
            },2000);
        }
    });


    return (
    <View className="items-center justify-center flex-1 text-white bg-primary">
      <Text className="text-3xl font-bold">Pomegra</Text>
    </View>
  );
};


export default Splash;

import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from './auth/AuthProvider';
import img from './assets/home3.png';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Cloud from 'react-native-vector-icons/Feather';
import Soil from 'react-native-vector-icons/AntDesign';

const Home = () => {

  const [greeting, setGreeting] = useState();
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  const navigation = useNavigation();

  const handleDisease = () => {
    // Navigate to ForgotPassword screen
    navigation.navigate('Disease');
  };

  const handleGreeting = () => {
    const currentHour = new Date().getHours();
    let newGreeting;

    if (currentHour >= 5 && currentHour < 12) {
      newGreeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      newGreeting = 'Good afternoon';
    } else if (currentHour >= 18 && currentHour < 24) {
      newGreeting = 'Good evening';
    } else {
      newGreeting = 'Good night';
    }
    setGreeting(newGreeting);
  };

  // Call handleGreeting when the component mounts to set the initial greeting
  useEffect(() => {
    handleGreeting();
  }, []);


  return (
    <View className="w-screen h-screen bg-gray-100">
      <View className="">
        <Image source={img} className="w-screen h-[30vh] rounded-b-[50px] bg-cover " />
        <Text className="text-3xl text-center text-white -mt-36">{greeting}</Text>
      </View>

      <View className="flex-row items-center justify-center w-screen gap-3 mx-auto mt-16">
        <View className="flex items-center text-black">
          <TouchableOpacity onPress={() =>
            navigation.navigate('Quality')
          } style={{elevation: 10 }}>
            <LinearGradient colors={['#f87171', '#fdba74']} className="flex items-center justify-center h-[70px]  rounded-lg w-[70px] shadow" >
              <MaterialCommunityIcons name="fruit-pineapple" color="white" size={50} />
            </LinearGradient>
          </TouchableOpacity>
          <Text className="font-light text-black">Quality</Text>
        </View>
        <View className="flex items-center text-black">
          <TouchableOpacity onPress={() =>
            navigation.navigate('Disease')
          }style={{elevation: 10 }}>
            <LinearGradient colors={['#059669', '#6ee7b7']} className="flex items-center justify-center h-[70px]  rounded-lg w-[70px] shadow" >
              <MaterialCommunityIcons name="leaf" color="white" size={50} />
            </LinearGradient>
          </TouchableOpacity>
          <Text className="font-light text-black">Disease</Text>
        </View>
        <View className="flex items-center text-black">
          <TouchableOpacity onPress={() =>
            navigation.navigate('Climate')
          }style={{elevation: 10 }}>
            <LinearGradient colors={['#2563eb', '#38bdf8']} className="flex items-center justify-center h-[70px]  rounded-lg w-[70px] shadow" >
              <Cloud name="cloud-rain" color="white" size={50} />
            </LinearGradient>
          </TouchableOpacity>
          <Text className="font-light text-black">Climate</Text>
        </View>
        <View className="flex items-center text-black"  style={{elevation: 10 }}>
          <TouchableOpacity onPress={() =>
            navigation.navigate('Soil')
          }>
            <LinearGradient colors={['#be123c', '#fdba74']} className="flex items-center justify-center h-[70px]  rounded-lg w-[70px] shadow" >
              <Soil name="caretdown" color="white" size={50} />
            </LinearGradient>
          </TouchableOpacity>
          <Text className="font-light text-black">Soil</Text>
        </View>
      </View>

      <View className="flex-row justify-between w-screen gap-1 px-4 mx-auto max-w-[80%] py-8">
        <View className="flex items-center justify-center w-32 p-4 bg-white rounded-lg">
          <Text className="text-3xl font-semibold text-gray-500">30C</Text>
          <Text className="text-lg text-gray-500 ">Temprature </Text>
        </View>
        <View className="flex items-center justify-center w-32 p-4 bg-white rounded-lg">
          <Text className="text-3xl font-semibold text-gray-500">80%</Text>
          <Text className="text-lg text-gray-500 ">Humidity </Text>
        </View>
      </View>


      <TouchableOpacity onPress={() => logout()} className="w-[80%] px-2 py-1 bg-primary text-center h-12 items-center mt-6">
        <Text className="text-lg font-bold text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Home;

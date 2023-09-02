import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, RefreshControl, StatusBar } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from './auth/AuthProvider';
import img from './assets/home3.png';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Cloud from 'react-native-vector-icons/Feather';
import Soil from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import Foorcast from './climate/Foorcast';


const Home = () => {

  const [greeting, setGreeting] = useState();
  const { user } = useContext(AuthContext);
  const [humidity, setHumidity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

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


  const getClimate = async () => {
    try {
      const response = await axios.get(`http://192.168.226.130/api/data/DH0001`);
      if (response) {
        setHumidity(response.data.humidity);
        setTemperature(response.data.temperature);
      } else {
        console.log('Error getting data');
      }
    } catch (error) {
      //console.log("An error occurred:", error.message);
    }
  };


  // Call handleGreeting when the component mounts to set the initial greeting
  useEffect(() => {
    handleGreeting();
    getClimate(); // Initial call

    const interval = setInterval(() => {
      getClimate(); // Fetch climate data every 5 seconds
    }, 10000); // Interval in milliseconds (5 seconds)

    return () => {
      clearInterval(interval); // Clear interval when component unmounts
    };
  }, []);



  const onRefresh = async () => {
    setRefreshing(true);
    await getClimate();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View className="w-screen h-screen bg-[#ebeaea]" >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="">
            <Image source={img} className="w-screen h-[30vh] rounded-b-[50px] bg-cover " />
            <Text className="text-3xl text-center text-white -mt-36">{greeting}</Text>
          </View>

          <View className="flex-row items-center justify-center w-screen gap-3 mx-auto mt-16">
            <View className="flex items-center text-black">
              <TouchableOpacity onPress={() =>
                navigation.navigate('Quality')
              } style={{ elevation: 10 }}>
                <LinearGradient colors={['#f87171', '#fdba74']} className="flex items-center justify-center h-[70px]  rounded-lg w-[70px] shadow" >
                  <MaterialCommunityIcons name="fruit-pineapple" color="white" size={50} />
                </LinearGradient>
              </TouchableOpacity>
              <Text className="font-light text-black">Quality</Text>
            </View>
            <View className="flex items-center text-black">
              <TouchableOpacity onPress={() =>
                navigation.navigate('Disease')
              } style={{ elevation: 10 }}>
                <LinearGradient colors={['#059669', '#6ee7b7']} className="flex items-center justify-center h-[70px]  rounded-lg w-[70px] shadow" >
                  <MaterialCommunityIcons name="leaf" color="white" size={50} />
                </LinearGradient>
              </TouchableOpacity>
              <Text className="font-light text-black">Disease</Text>
            </View>
            <View className="flex items-center text-black">
              <TouchableOpacity onPress={() =>
                navigation.navigate('Climate')
              } style={{ elevation: 10 }}>
                <LinearGradient colors={['#2563eb', '#38bdf8']} className="flex items-center justify-center h-[70px]  rounded-lg w-[70px] shadow" >
                  <Cloud name="cloud-rain" color="white" size={50} />
                </LinearGradient>
              </TouchableOpacity>
              <Text className="font-light text-black">Climate</Text>
            </View>
            <View className="flex items-center text-black" style={{ elevation: 10 }}>
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

          <View className="flex-row justify-between w-screen gap-1 px-4 mx-auto max-w-[80%] py-8 ">
            <View className="flex items-center justify-center p-4 bg-white rounded-lg w-36 h-[150px]">
              {temperature !== '' ? (
                <>
                  <Text className="text-3xl font-semibold text-primary">{temperature}°C</Text>
                  <Text className="text-lg text-center text-gray-500">Current Temperature</Text>
                </>
              ) : (
                <Text className="text-lg font-semibold text-gray-500">Device Offline</Text>
              )}
            </View>
            <View className="flex items-center justify-center p-4 bg-white rounded-lg w-36 h-[150px]">
              {humidity !== '' ? (
                <>
                  <Text className="text-3xl font-semibold text-primary">{humidity}%</Text>
                  <Text className="text-lg text-center text-gray-500">Current Humidity</Text>
                </>
              ) : (
                <Text className="text-lg font-semibold text-gray-500">Device Offline</Text>
              )}
            </View>
          </View>
          <Foorcast />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};


export default Home;

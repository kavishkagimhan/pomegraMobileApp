import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Btn from '../components/Btn';
import { useNavigation } from '@react-navigation/core';

const SoilHome = () => {

  const navigation = useNavigation();

  const Test = () => {
    console.log('Testing');
  }

  return (
    <View className="bg-primary">
      <View
        className="bg-primary h-[30vh] rounded-b-3xl items-center justify-center" >
        <Text className="text-3xl text-white ">Soil Nutrient Detection</Text>
        <Text className="p-4 text-lg text-center text-white fint-light">Identify soli nutrient and get recomendations. </Text>
      </View>

      <View className="flex flex-col items-center justify-center p-4 bg-white w-autoscreen rounded-t-3xl ">
        <TouchableOpacity className="mt-8" onPress={() =>
              navigation.navigate('Npk')} >
          <LinearGradient style={{ elevation: 10 }} colors={['#059669', '#34d399']} className="px-4 py-2 rounded-xl w-[250px] items-center">
            <Text className="text-lg text-white">NPK Levels</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity className="mt-8" onPress={() =>
              navigation.navigate('Moisture')} >
          <LinearGradient style={{ elevation: 10 }} colors={['#059669', '#34d399']} className="px-4 py-2 rounded-xl w-[250px] items-center">
            <Text className="text-lg text-white">Soil Moisture</Text>
          </LinearGradient>
        </TouchableOpacity>  
        <TouchableOpacity className="mt-8" onPress={() =>
              navigation.navigate('Soil temperature')} >
          <LinearGradient style={{ elevation: 10 }} colors={['#059669', '#34d399']} className="px-4 py-2 rounded-xl w-[250px] items-center">
            <Text className="text-lg text-white">Soil Temperature</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity className="mt-8" onPress={() =>
              navigation.navigate('Fertilizers')} >
          <LinearGradient style={{ elevation: 10 }} colors={['#059669', '#34d399']} className="px-4 py-2 rounded-xl w-[250px] items-center">
            <Text className="text-lg text-white">Fertilizers</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SoilHome
import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image} from 'react-native';
import Slider from '@react-native-community/slider';
import Soil from "../assets/soil.png";
import Fertilizer from "../assets/fertilizer.jpg"

const Fertilizers = () => {
  const [temperatureLevel, setTemperatureLevel] = useState(50); 

  return (
    <ImageBackground
      source={Soil} // Change to your image path
      className="items-center w-screen h-screen bg-primary"
    >
      <Text className="p-4 text-2xl font-semibold">Fertilizers</Text>
      <View className="mt-8 ">
        <Image source={Fertilizer} className="w-[256px] h-[256px]"/>
      </View>
      <TouchableOpacity
        className="w-[50%] rounded-md px-2 py-1 bg-primary text-center h-12 items-center mt-16"
      >
        <Text className="text-lg font-bold text-white">More Information</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};


export default Fertilizers;

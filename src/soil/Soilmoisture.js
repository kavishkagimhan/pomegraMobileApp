import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Soil from "../assets/soil.png";

const Soilmoisture = () => {
  const [moistureLevel, setMoistureLevel] = useState(50); // Initial moisture level

  return (
    <ImageBackground
      source={Soil} // Change to your image path
      className="items-center w-screen h-screen bg-primary"
    >
      <Text className="p-4 text-2xl font-semibold">Soil Moisture</Text>
      <Text className="text-xl font-semibold">Moisture Level: {moistureLevel}%</Text>
      <Slider
        style={{ width: 200, height: 40, padding: 6, backgroundColor: 'white' }}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={moistureLevel}
        onValueChange={(value) => setMoistureLevel(value)}
      />
      <View className="mt-8">

        <View className="w-[80vw] bg-gray-300 h-[30vh] rounded-lg p-2">
          <Text className="p-2 text-lg font-semibold text-center">Message</Text>
          <Text className="p-2 text-center">
            In publishing and graphic design, Lorem ipsum is a placeholder
            text commonly used to demonstrate the visual form of a document
            or a typeface without relying

          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="w-[50%] rounded-md px-2 py-1 bg-primary text-center h-12 items-center mt-16"
      >
        <Text className="text-lg font-bold text-white">More Information</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};


export default Soilmoisture;

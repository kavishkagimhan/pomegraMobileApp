import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'


const Foorcast = () => {
  return (
    <View className="bg-[#ffffff] rounded-lg  h-auto w-auto">
      <Text className="p-4 font-semibold text-center text-black bg-gray-100">3 day Forecast</Text> 
      <View className="flex flex-row items-center justify-between w-[95%] mx-auto p-2 text-center border-b ">
        <Text className="text-gray-700">Today</Text>
        <Text>Thunderstroam</Text>
        <Text className="text-gray-700">Temperature  27°C</Text>
      </View>
      <View className="flex flex-row items-center justify-between w-[95%] mx-auto p-2 text-center border-b ">
        <Text className="text-gray-700">Today</Text>
        <Text>Thunderstroam</Text>
        <Text className="text-gray-700">Temperature  27°C</Text>
      </View>
      <View className="flex flex-row items-center justify-between w-[95%] mx-auto p-2 text-center border-b ">
        <Text className="text-gray-700">Today</Text>
        <Text>Thunderstroam</Text>
        <Text className="text-gray-700">Temperature  27°C</Text>
      </View>
    </View>
  )
}

export default Foorcast
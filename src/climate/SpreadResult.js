import { View, Text, Image } from 'react-native'
import React from 'react'

const SpreadResult = ({ route }) => {

    const { status, name } = route.params;


  return (
    <View className="w-screen h-screen">
      <Text className="p-2 text-2xl font-bold text-center">Spread Result</Text>
      <View className="items-center w-screen">
        <Text>In this Climate Conditions {name} Spread is {status}</Text>
        <Text>Start The neccesory Treatment Quickly</Text>
      </View>
    </View>
  )
}

export default SpreadResult
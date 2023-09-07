import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const SpreadResult = ({ route }) => {
  const { status, name } = route.params;

  let treatmentText = null; // Initialize treatmentText to null

  if (status === 'medium' || status === 'high') {
    treatmentText = (
      <Text className="p-2 text-lg text-black bg-yellow-500">
        Start The necessary Treatment Quickly
      </Text>
    );
  }

  return (
    <View className="flex items-center w-screen h-screen bg-emerald-600">
      <View className="mt-[200px]">
        <Text className="p-2 text-2xl font-bold text-center text-white">Spread Result</Text>
        <View className="items-center w-screen">
          <Text className="p-4 text-lg text-center text-white">
            In this Climate Conditions <Text className="p-2 bg-red-600">{name}</Text> Spread is{' '}
            <Text className="p-2 text-xl bg-red-600">{status}</Text> Probability
          </Text>
          {treatmentText} 
        </View>
      </View>
    </View>
  );
};

export default SpreadResult;

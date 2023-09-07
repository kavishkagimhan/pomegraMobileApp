import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import HAppy from 'react-native-vector-icons/Entypo';
import Sad from 'react-native-vector-icons/Entypo';
import Qus from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const QualityResult = ({ route }) => {
  const { validate, emoji } = route.params;

  return (
    <View className="w-screen h-screen text-white bg-emerald-600">
      <Text className="justify-center py-6 text-3xl font-semibold text-center text-white">Results</Text>
      <View className="flex items-center">
          <Text className="justify-center mb-6 text-2xl text-center text-white">You Uploaded {validate} Image</Text>
          <HAppy name={emoji} color="white" size={80} />
      </View>
    </View>
  );
}

export default QualityResult;

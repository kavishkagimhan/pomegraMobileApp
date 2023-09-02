import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Npk = () => {
  const [nValue, setNValue] = useState('');
  const [pValue, setPValue] = useState('');
  const [kValue, setKValue] = useState('');
  const [treatment, setTreatment] = useState('');
  const [nValidationMessage, setNValidationMessage] = useState('');
  const [pValidationMessage, setPValidationMessage] = useState('');
  const [kValidationMessage, setKValidationMessage] = useState('');

  const handleTreatment = async () => {
    // Reset previous validation messages
    setNValidationMessage('');
    setPValidationMessage('');
    setKValidationMessage('');

    // Validate input fields
    if (!nValue) {
      setNValidationMessage('Please enter Nitrogen Level.');
    }

    if (!pValue) {
      setPValidationMessage('Please enter Phosphorus Level.');
    }

    if (!kValue) {
      setKValidationMessage('Please enter Potassium Level.');
    }

    if (!nValue || !pValue || !kValue) {
      return; // Don't proceed if any field is empty
    }

    if (isNaN(Number(nValue)) || isNaN(Number(pValue)) || isNaN(Number(kValue))) {
      setNValidationMessage('N should be a number.');
      setPValidationMessage('P should be a number.');
      setKValidationMessage('K should be a number.');
      return;
    }

    // Create a JSON object with the NPK values
    const npkData = {
      nitrogen: parseFloat(nValue),
      phosphorus: parseFloat(pValue),
      potassium: parseFloat(kValue),
    };

    try {
      // Send a POST request to the API with the JSON data
      const response = await axios.post('http://192.168.8.100:8005/suggest-fertilizers', npkData);

      // Handle the response from the API (replace this with your own logic)
      const result = response.data; // Assuming the API returns the result in JSON format
      setTreatment(result.suggested_fertilizer);
      console.log(result);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handleRefresh = () => {
    setNValue('');
    setPValue('');
    setKValue('');
    setTreatment('');
    setNValidationMessage('');
    setPValidationMessage('');
    setKValidationMessage('');
  };

  return (
    <View className="w-screen h-screen">
      <Text className="p-4 text-2xl font-semibold text-center text-primary">Enter NPK Levels</Text>
      <View className="flex flex-row items-center justify-center mt-4">
        <Text className="text-black">N : </Text>
        <TextInput
          value={nValue}
          onChangeText={(text) => setNValue(text)}
          className="px-2 py-1 text-black bg-white dark:text-black w-[70%] text-lg border border-primary rounded-md"
          placeholder='Enter Nitrogen Level'
          keyboardType='numeric'
        />
      </View>
      <Text className="ml-2 text-center text-red-600">{nValidationMessage}</Text>
      <View className="flex flex-row items-center justify-center mt-4">
        <Text className="text-black">P : </Text>
        <TextInput
          value={pValue}
          onChangeText={(text) => setPValue(text)}
          className="px-2 py-1 text-black bg-white dark:text-black w-[70%] text-lg border border-primary rounded-md"
          placeholder='Enter Phosphorus Level'
          keyboardType='numeric'
        />
      </View>
      <Text className="ml-2 text-center text-red-600">{pValidationMessage}</Text>
      <View className="flex flex-row items-center justify-center mt-4">
        <Text className="text-black">K : </Text>
        <TextInput
          value={kValue}
          onChangeText={(text) => setKValue(text)}
          className="px-2 py-1 text-black bg-white dark:text-black w-[70%] text-lg border border-primary rounded-md"
          placeholder='Enter Potassium Level'
          keyboardType='numeric'
        />
      </View>
      <Text className="ml-2 text-center text-red-600">{kValidationMessage}</Text>
      <View className='flex items-center mt-8'>
        <TouchableOpacity
          className="w-[80%] rounded-md px-2 py-1 bg-primary text-center h-12 items-center mt-6"
          onPress={handleTreatment}
        >
          <Text className="text-lg font-bold text-white">Treatment</Text>
        </TouchableOpacity>
      </View>
      <View className="flex items-center justify-start mt-8">
        <Text className='p-4 text-lg text-black bg-white rounded-md h-[150px] w-[70%]'>
          {treatment}
        </Text>
      </View>
      <View className='flex items-center mt-8'>
        <TouchableOpacity
          className="w-[50%] rounded-md px-2 py-1 bg-primary text-center h-12 items-center mt-6"
          onPress={handleRefresh}
        >
          <Text className="text-lg font-bold text-white">Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Npk;

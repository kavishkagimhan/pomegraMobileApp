import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import ImageResizer from 'react-native-image-resizer';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Find from 'react-native-vector-icons/AntDesign';

const FindQuality = ({ route }) => {
  const { imageUri } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const handleFindDisease = async () => {
    if (imageUri) {
      try {
        setIsLoading(true);

        // Resize the image to 256x256
        const resizedImage = await ImageResizer.createResizedImage(
          imageUri,
          256,
          256,
          'JPEG',
          80
        );

        // Perform your Axios post request here
        const response = await axios.post('http://192.168.8.100:8000/predict', {
          file: resizedImage.uri, // Send the resized image URI to the server
        });



        // Handle the response from the server
        console.log('Response from server:', response);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View className="flex items-center">
      <LinearGradient
        style={{ elevation: 10 }}
        colors={['#DE1B55', '#F67A92']} className="bg-primary h-[30vh] rounded-b-3xl items-center justify-center w-screen" >
        <Text className="text-3xl text-white ">Find Your Fruit Quality</Text>
        <Text className="p-4 text-lg text-center text-white fint-light">Now Click Find Quality Button.  </Text>
      </LinearGradient>
      {imageUri ? (
        <View className="p-4 rounded-full ">
          <Image source={{ uri: imageUri }} className='w-[256px] h-[256px] ' />
        </View>

      ) : (
        <Text style={styles.noImageText}>No Image Selected</Text>
      )}

      <LinearGradient style={{ elevation: 10 }} colors={['#059669', '#34d399']} className="px-4 py-2 rounded-xl w-[250px] items-center">
        <TouchableOpacity onPress={handleFindDisease} disabled={isLoading} className="flex-row items-center gap-4">
          <Find name="search1" color="white" size={20} />
          <Text className="text-lg text-white">
            {isLoading ? 'Predicting Quality...' : 'Predict Quality'}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};



export default FindQuality;

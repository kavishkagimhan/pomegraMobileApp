import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import LinearGradient from 'react-native-linear-gradient';
import Find from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';

const FindDisease = ({ route }) => {
  const { imageUri } = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState('');
  const [res2, setRes2] = useState('');
  const [error, setError] = useState(null);

  const handleFindDisease = async () => {
    if (imageUri) {
      try {
        setIsLoading(true);
        setError(null);

        // Resize the image to 256x256
        const resizedImage = await ImageResizer.createResizedImage(
          imageUri,
          256,
          256,
          'JPEG',
          100,
          0,
          undefined,
          false,
          { mode: 'contain', onlyScaleDown: false }
        );
        const filename = imageUri.split('/').pop() || 'default.jpg';
        const data = new FormData();
        data.append('file', {
          uri: resizedImage.uri,
          name: filename,
          type: 'image/jpg',
        });

        const backendURL = 'http://192.168.8.102:8000';

        const response = await fetch(`${backendURL}/predict`, {
          method: 'POST',
          body: data,
        });
        const responseData = await response.json();

        if (responseData) {
          const validate = responseData.class_model_1;
          if (validate === "Diseases") {
            navigation.navigate('DiseaseResult', { validate: "Disease", disease: responseData.class_model_2, emoji: "emoji-sad" });
          } else if (validate === "Helthy") {
            navigation.navigate('DiseaseResult', { validate: "Healthy", disease: "null", emoji: "emoji-happy" });
          }
          else {
            navigation.navigate('DiseaseResult', { validate: validate, disease: "null", emoji: "none" });
          }
        } else {
          setError('Invalid response from the server');
        }

      } catch (error) {
        console.log('Error:', error);
        setError('An error occurred while finding the disease.');
      } finally {
        setIsLoading(false);
      }
    }
  };


  return (
    <View className="flex items-center">
      <LinearGradient
        style={{ elevation: 10 }}
        colors={['#DE1B55', '#F67A92']} className="bg-primary h-[20vh] rounded-b-3xl items-center justify-center w-screen" >
        <Text className="text-3xl text-white ">Find Your Leaf Diseases</Text>
        <Text className="p-4 text-lg text-center text-white fint-light">Now Click Find Disease Button.  </Text>
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
            {isLoading ? 'Finding Disease...' : 'Find Disease'}
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      {res && <Text className="text-lg font-semibold text-black ">{res}</Text>}
      {res2 && <Text className="text-lg font-semibold text-black ">{res2}</Text>}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noImageText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default FindDisease;

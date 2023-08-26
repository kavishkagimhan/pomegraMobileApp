import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import ImageResizer from 'react-native-image-resizer';
import axios from 'axios';

const FindDisease = ({ route }) => {
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
    <View style={styles.container}>
      <Text style={styles.heading} className='p-4 bg-red-300 teext-4xl'>Find Disease</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.noImageText}>No Image Selected</Text>
      )}
      <TouchableOpacity
        style={styles.findDiseaseButton}
        onPress={handleFindDisease}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Finding Disease...' : 'Find Disease'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 18,
    color: '#777',
    marginBottom: 20,
  },
  findDiseaseButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FindDisease;

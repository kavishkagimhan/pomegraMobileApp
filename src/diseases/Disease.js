import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import Camera from 'react-native-vector-icons/AntDesign';
import ImageResizer from 'react-native-image-resizer';
import Gallery from 'react-native-vector-icons/FontAwesome';

export default function Disease() {

    const [selectedImageUri, setSelectedImageUri] = useState('');
    const [resizedImageUri, setResizedImageUri] = useState()
    const navigation = useNavigation();



    const handleLaunchCamera = () => {
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64: false,
            },
            async (response) => {
                if (!response.didCancel && response.assets && response.assets.length > 0) {
                    const imageUri = response.assets[0].uri;

                    try {
                        // Resize the image to 256x256
                        const resizedImageUri = await ImageResizer.createResizedImage(
                            imageUri,
                            256,
                            256,
                            'JPEG',
                            100, // Image quality (0-100)
                            0,   // Rotation (0 = no rotation)
                            // Output directory (null = same as the original)
                             // Output filename (null = random name)
                        );

                        // Now you can navigate to 'Find' screen with the resized image URI
                        navigation.navigate('Find', { imageUri: resizedImageUri.uri });
                    } catch (error) {
                        console.error('Error resizing the image:', error);
                    }
                } else {
                    console.log('Camera launch cancelled or failed.');
                }
            }
        );
    };

    const handleLaunchImageLibrary = () => {

        let options = {
            storageOptions: {
                path: 'image',
            },
        }

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log("User cancelled image selection");
            } else if (response.error) {
                console.log("Image selection error:", response.error);
            } else if (response.assets && response.assets.length > 0) {
                navigation.navigate('Find', { imageUri: response.assets[0].uri });
            } else {
                console.log("No image selected");
            }
        });
    };


    return (
        <View className="w-screen h-screen bg-primary">
            <View
                className="bg-primary h-[30vh] rounded-b-3xl items-center justify-center" >
                <Text className="text-3xl text-white ">Identify Leaf Diseases</Text>
                <Text className="p-4 text-lg text-center text-white fint-light">Take photos, diagnose diseases, and learn how to treat them. </Text>
            </View>
            <View className="flex items-center  h-[100%]   bg-white rounded-t-3xl w-screen">
                <LinearGradient style={{ elevation: 10 }} colors={['#059669', '#34d399']} className="mt-12 px-4 py-2 rounded-xl w-[250px] items-center">
                    <TouchableOpacity onPress={handleLaunchCamera} className="flex-row items-center gap-4">
                        <Camera name="camera" color="white" size={20} />
                        <Text className="text-lg text-white">Take a Photo</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <LinearGradient style={{ elevation: 10 }} colors={['#059669', '#34d399']} className="mt-4 px-4 py-2 rounded-xl w-[250px] items-center">
                    <TouchableOpacity onPress={handleLaunchImageLibrary} className="flex-row items-center gap-4">
                        <Gallery name="photo" color="white" size={20} />
                        <Text className="text-lg text-white">Upload from gallery</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

        </View>
    );
}



import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import Camera from 'react-native-vector-icons/AntDesign';
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
            response => {
                if (!response.didCancel && response.assets && response.assets.length > 0) {
                    navigation.navigate('Find', { imageUri: response.assets[0].uri });
                } else {
                    console.log("Camera launch cancelled or failed.");
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
        <View className="h-screen">
            <LinearGradient
                style={{ elevation: 10 }}
                colors={['#DE1B55', '#F67A92']} className="bg-primary h-[30vh] rounded-b-3xl items-center justify-center" >
                <Text className="text-3xl text-white ">Identify Leaf Diseases</Text>
                <Text className="p-4 text-lg text-center text-white fint-light">Take photos, diagnose diseases, and learn how to treat them. </Text>
            </LinearGradient>
            <View className="flex items-center justify-center gap-4 mt-16">
                <LinearGradient style={{ elevation: 10 }} colors={['#059669', '#34d399']} className="px-4 py-2 rounded-xl w-[250px] items-center">
                    <TouchableOpacity onPress={handleLaunchCamera} className="flex-row items-center gap-4">
                        <Camera name="camera" color="white" size={20} />
                        <Text className="text-lg text-white">Take a Photo</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <LinearGradient style={{ elevation: 10 }} colors={['#059669', '#34d399']} className="px-4 py-2 rounded-xl w-[250px] items-center">
                    <TouchableOpacity onPress={handleLaunchImageLibrary} className="flex-row items-center gap-4">
                        <Gallery name="photo" color="white" size={20} />
                        <Text className="text-lg text-white">Upload from gallery</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

        </View>
    );
}



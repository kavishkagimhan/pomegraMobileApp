import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/core';

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
            if (response.assets[0].uri) {
                navigation.navigate('Find', { imageUri: response.assets[0].uri });
            } else {
                console.log(error);
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Select Disease Image</Text>
            <TouchableOpacity style={styles.pickImageButton} onPress={handleLaunchCamera}>
                <Text style={styles.buttonText}>Launch Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickImageButton} onPress={handleLaunchImageLibrary}>
                <Text style={styles.buttonText}>Pick from Gallery</Text>
            </TouchableOpacity>
        </View>
    );
}

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
    pickImageButton: {
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

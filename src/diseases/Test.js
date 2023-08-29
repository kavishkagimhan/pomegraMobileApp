import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    useColorScheme,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

function ImageUpload() {
    const navigation = useNavigation();
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const [selectImage, setSelectImage] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    const pickImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
            storageOptions: {
                path: 'images',
                cameraRoll: true,
            },
        };
        launchImageLibrary(options, (response) => {
            setSelectImage(response.assets[0].uri);
            setIsSelected(true);
            console.log('Response = ', response.assets[0].uri);
        });
    };

    const takeImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
            storageOptions: {
                path: 'images',
                cameraRoll: true,
            },
        };

        launchCamera(options, (response) => {
            setSelectImage(response.assets[0].uri);
            setIsSelected(true);
            console.log('Response = ', response.assets[0].uri);
        });
    };

    const handleImageUpload = async () => {
        try {
            if (!isSelected) {
                Alert.alert('Error', 'No image selected');
                return;
            }

            const resizedImage = await ImageResizer.createResizedImage(
                selectImage,
                256,
                256,
                'JPEG',
                100,
                0,
                undefined,
                false,
                { mode: 'contain', onlyScaleDown: false }
            );

            const filename = selectImage.split('/').pop() || 'default.jpg';
            const data = new FormData();
            data.append('file', {
                uri: resizedImage.uri,
                name: filename,
                type: 'image/jpg',
            });



            const backendURL = 'http://192.168.8.100:8000';

            const response = await fetch(`${backendURL}/upload_image`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: data,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const responseData = await response.json();

            setIsSelected(false);
            setSelectImage('');
            setUploadedImageUrl(responseData.image_url);
            Alert.alert('Done', 'Image Uploaded');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to upload image');
        }
    };
    const navigateToSeverityResult = () => {
        navigation.navigate('SeverityPrediction', { uploadedImageUrl: uploadedImageUrl });
    };


    return (
        <SafeAreaView
            style={{
                backgroundColor: backgroundStyle.backgroundColor,
                height: '100%',
            }}
        >
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles(backgroundStyle.backgroundColor).scroll}
            >
                <View style={styles(backgroundStyle.backgroundColor).container}>
                    <View>
                        <TouchableOpacity
                            style={styles(backgroundStyle.backgroundColor).galleryView1}
                            onPress={pickImage}
                        >
                            <Text style={styles(backgroundStyle.backgroundColor).buttonGellary}>
                                Open Gallery
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles(backgroundStyle.backgroundColor).galleryView}
                            onPress={takeImage}
                        >
                            <Text style={styles(backgroundStyle.backgroundColor1).buttonGellary}>
                                Take an image
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles(backgroundStyle.backgroundColor).imgView}>
                        <Image
                            style={styles(backgroundStyle.backgroundColor).img}
                            source={isSelected ? { uri: selectImage } : require('../../assets/user.jpg')}
                        />
                    </View>
                    {isSelected && (
                        <TouchableOpacity
                            style={styles(backgroundStyle.backgroundColor).galleryView}
                            onPress={handleImageUpload}
                        >
                            <Text style={styles(backgroundStyle.backgroundColor).buttonGellary}>
                                Upload Image
                            </Text>
                        </TouchableOpacity>
                    )}
                    {uploadedImageUrl !== '' && (
                        <View style={styles(backgroundStyle.backgroundColor).imgUrlView}>

                        </View>
                    )}
                    {uploadedImageUrl !== '' && (
                        <TouchableOpacity
                            style={styles(backgroundStyle.backgroundColor).galleryView}
                            onPress={navigateToSeverityResult}
                        >
                            <Text style={styles(backgroundStyle.backgroundColor).buttonGellary}>
                                Get Severity Prediction
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = (backgroundColor) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backgroundColor,
        },
        galleryView: {
            backgroundColor: 'green',
            padding: 20,

            borderRadius: 10,
            marginTop: 20,
        },

        galleryView1: {
            backgroundColor: 'green',
            padding: 20,

            borderRadius: 10,
            marginTop: 20,
        },
        buttonGellary: {
            color: '#fff',
            fontSize: 20,
        },
        scroll: {
            width: '100%',
            height: '100%',
        },
        imgUrlView: {},
        imgView: {
            marginTop: 20,
            width: '80%',
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
        },
        imgUrlText: {},
        img: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
        },
        appBar: {
            width: '100%',
            height: 50,
            backgroundColor: 'skyblue',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
        },
        header: {
            color: '#fff',
            fontSize: 20,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
        },
        button: {
            flex: 1,
            marginRight: 10, // Add some margin between the buttons
        },

    });

export default ImageUpload;
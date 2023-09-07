import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../auth/AuthProvider';
import Geolocation from '@react-native-community/geolocation';

const AddFarm = () => {


    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [district, setDistrict] = useState('');
    const { user } = useContext(AuthContext);

    const setFarm = async () => {
        if (!name || !district) {
            setError('Farm name and district cannot be empty');
            return;
        }

        try {
            Geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    const farmRef = firestore().collection('farms');
                    const farmDocRef = farmRef.doc(user.uid);

                    await farmDocRef.set({
                        name: name,
                        district: district,
                        latitude: latitude,
                        longitude: longitude,
                    });

                    setName(''); // Clear input fields
                    setDistrict('');
                    setError(''); // Clear error message

                    // Optionally, show a success message or navigate to another screen.
                    console.log('Farm data saved successfully');
                },
                (error2) => {
                    console.error('Error getting location:', error2);
                    setError('An error occurred while getting your location');
                }
            );
        } catch (error) {
            console.error('Error saving farm data to Firestore:', error);
            setError('An error occurred while saving farm data');
        }
    };

    return (

        <View>
            <Text style={{ padding: 16, fontSize: 20 }} className="text-black">Add Farm Information:</Text>
            <View className="flex flex-row items-center justify-center px-6 py-2">
                <Text style={{ marginRight: 8, fontSize: 16 }}>Enter Farm Name</Text>
                <TextInput
                    className="px-2 py-1 text-black bg-white dark:text-black w-[60%] text-lg border border-primary rounded-md"
                    placeholder='Enter Farm Name'

                    onChangeText={(text) => {
                        setName(text);

                    }}
                />
            </View>
            <View className="flex flex-row items-center justify-center px-6 py-2">
                <Text style={{ marginRight: 8, fontSize: 16 }}>Enter District</Text>
                <TextInput
                    className="px-2 py-1 text-black bg-white dark:text-black w-[70%] text-lg border border-primary rounded-md"
                    placeholder='Enter District'

                    onChangeText={(text) => {
                        setDistrict(text);

                    }}
                />
            </View>
            <View className="items-center w-screen">
                <TouchableOpacity
                    className="w-[50%] rounded-md px-2 py-1 bg-primary text-center h-12 items-center mt-2"
                    onPress={setFarm}
                >
                    <Text className="text-lg font-bold text-white">Add Farm</Text>
                </TouchableOpacity>
            </View>
            <View className="items-center w-screen text-center">
                {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
            </View>

        </View>
    )
}

export default AddFarm
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../auth/AuthProvider';
import Geolocation from '@react-native-community/geolocation';
import AddFarm from './AddFarm';


const Settings = () => {
    const [deviceId, setDeviceId] = useState('');
    const [error, setError] = useState('');
    const [error2, setError2] = useState('');
    const [name, setName] = useState('');
    const [district, setDistrict] = useState('');
    const { user } = useContext(AuthContext);

    const setDevice = async () => {
        if (!deviceId) {
            setError('Device ID cannot be empty');
            return;
        }

        try {
            // Create a reference to the Firestore collection
            const devicesRef = firestore().collection('devices');

            // Set the document ID to be the user's ID
            const deviceDocRef = devicesRef.doc(user.uid);

            // Add the device data to Firestore
            await deviceDocRef.set({
                deviceId: deviceId,
               
            });

            // Clear the input field and error message after successful submission
            setDeviceId('');
            setError('');

            // Optionally, you can show a success message or navigate to another screen.
        } catch (error) {
            console.error('Error saving data to Firestore:', error);
            // Handle the error appropriately, e.g., show an error message to the user.
            setError('An error occurred while saving data');
        }
    };



    const setFarm = async () => {
        if (!name || !district) {
            setError('Farm name and district cannot be empty');
            return;
        }

        try {
            // Get the user's current location (latitude and longitude)
            Geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Create a reference to the Firestore collection 'farm'
                    const farmRef = firestore().collection('farm');

                    // Set the document ID to be the user's UID
                    const farmDocRef = farmRef.doc(user.uid);

                    // Add the farm data to Firestore
                    await farmDocRef.set({
                        name: name,
                        district: district,
                        latitude: latitude,
                        longitude: longitude,
                    });

                    // Clear the input fields and error message after successful submission
                    setName('');
                    setDistrict('');
                    setError2('');

                    // Optionally, you can show a success message or navigate to another screen.
                },
                (error2) => {
                    console.error('Error getting location:', error2);
                    setError2('An error occurred while getting your location');
                }
            );
        } catch (error) {
            console.error('Error saving farm data to Firestore:', error);
            // Handle the error appropriately, e.g., show an error message to the user.
            setError2('An error occurred while saving farm data');
        }
    };



    return (
        <View style={{ flex: 1 }}>
            <Text style={{ padding: 16, fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Settings</Text>
            <View>
                <Text className="text-black" style={{ padding: 16, fontSize: 20 }}>Configure Climate Device:</Text>
                <View className="flex flex-row items-center justify-center p-6 mt-4">
                    <Text style={{ marginRight: 8, fontSize: 16 }}>Enter Device ID</Text>
                    <TextInput
                        className="px-2 py-1 text-black bg-white dark:text-black w-[70%] text-lg border border-primary rounded-md"
                        placeholder='Enter IoT Device ID'
                        value={deviceId}
                        onChangeText={(text) => {
                            setDeviceId(text);
                            setError(''); // Clear the error message when input changes
                        }}
                    />
                </View>
                {error ? (
                    <Text style={{ color: 'red', fontSize: 16, textAlign: 'center', marginTop: 8 }}>{error}</Text>
                ) : null}
                <View className="items-center w-screen">
                    <TouchableOpacity
                        className="w-[50%] rounded-md px-2 py-1 bg-primary text-center h-12 items-center mt-2"
                        onPress={setDevice}
                    >
                        <Text className="text-lg font-bold text-white">Submit</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View>
                <AddFarm/>
            </View>
        </View>
    );
};

export default Settings;

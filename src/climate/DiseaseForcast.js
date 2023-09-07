import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react';
import Aphid from "../assets/aphid.jpg"
import Whiteflie from '../assets/whiteflies.jpg'
import Bacterial from '../assets/bacterial.jpg'
import Antraconos from '../assets/antraconos.jpg'
import { AuthContext } from '../auth/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';

const DiseaseForcast = () => {
    
    const navigation = useNavigation();
    const [maxTemp, setMaxTemp] = useState("")
    const [minTemp, setMinTemp] = useState("")
    const [avgTemp, setAvgTemp] = useState("")
    const [maxHumidity, setMaxHumidity] = useState("")
    const [minHumidity, setMinHumidity] = useState("")
    const [avgHumidity, setAvgHumidity] = useState("")
    const { user } = useContext(AuthContext);
    const [temperatureData, setTemperatureData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const [climate, setClimateData] = useState([]);
    const [hourArray, setHourArray] = useState([]);
    const backend = "http://192.168.73.120:8005/"

    const getClimateData = async () => {
        try {
            const weatherDataSnapshot = await firestore()
                .collection('weatherData')
                .doc(user.uid) // Use the user's UID as the document ID
                .get();

            if (weatherDataSnapshot.exists) {
                const weatherData = weatherDataSnapshot.data();
                setClimateData(weatherData.climateData)
                // Assuming weatherData has temperature and humidity properties
                // console.log(weatherData.climateData)
            } else {
                console.log('Weather data not found for user:', user.uid);
                // Handle the case where weather data is not found for the user
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Handle the error appropriately
        }
    };

    
    useEffect(() => {
        const intervalId = setInterval(() => {
            getClimateData();
        }, 2000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [user]);


    
    useEffect(() => {
        // Check if 'climate' is defined and not empty
        if (climate && Object.keys(climate).length > 0) {
            const humidityValuesArray = [];
            const temperatureValuesArray = [];
            const hourArray = [];

            // Convert the climate object into an array of entries and sort it by timestamp
            const sortedClimate = Object.entries(climate).sort((a, b) => {
                return new Date(a[0]) - new Date(b[0]);
            });

            for (const [timestamp, data] of sortedClimate) {
                const humidity = data.humidity;
                const pressure = data.pressure;
                const temperature = data.temperature;
                humidityValuesArray.push(humidity);
                temperatureValuesArray.push(temperature);

                // Extract hour from the timestamp (assuming timestamp is in UTC)
                const dateObj = new Date(timestamp);

                const hours = dateObj.getHours();
                const minutes = dateObj.getMinutes();
                const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                hourArray.push(`${formattedTime}`);
            }

            // Only take the last 24 entries to have data for the last 24 hours
            const last24Humidity = humidityValuesArray.slice(-24);
            const last24Temperature = temperatureValuesArray.slice(-24);
            const last24Hours = hourArray.slice(-24);
            setTemperatureData(last24Temperature);
            setHumidityData(last24Humidity);
            setHourArray(last24Hours);
        }
    }, [climate]);

    useEffect(() => {
        getClimateData();
    }, [user]); // Fetch data when the user context changes

    useEffect(() => {
        // Calculate average, max, and min values for temperature and humidity
        const calculateStats = (data) => {
            const sum = data.reduce((acc, value) => acc + value, 0);
            const avg = sum / data.length;
            const max = Math.max(...data);
            const min = Math.min(...data);
            return { avg, max, min };
        };

        if (temperatureData.length > 0) {
            const temperatureStats = calculateStats(temperatureData);
            setAvgTemp(temperatureStats.avg.toFixed(2));
            setMaxTemp(temperatureStats.max.toFixed(2));
            setMinTemp(temperatureStats.min.toFixed(2));
        }

        if (humidityData.length > 0) {
            const humidityStats = calculateStats(humidityData);
            setAvgHumidity(humidityStats.avg.toFixed(2));
            setMaxHumidity(humidityStats.max.toFixed(2));
            setMinHumidity(humidityStats.min.toFixed(2));
        }
    }, [temperatureData, humidityData]);

    const aphidForecast = async () => {
        const climateData = {
            temperature: avgTemp,
            humidity: avgHumidity,
        };
        try {
            // Send a POST request to the API with the JSON data
            const response = await axios.post(`${backend}predict_aphid`, climateData);

            // Handle the response from the API (replace this with your own logic)
            const result = response.data; // Assuming the API returns the result in JSON format
            navigation.navigate('Spread Result', { status: result.status, name:"Aphid" });
            console.log(result.status);
        } catch (error) {
            console.error('Error sending request:', error);
        }

    }
    const whiteFliesForecast = async () => {
        const climateData = {
            temperature: avgTemp,
            humidity: avgHumidity,
        };
        try {
            // Send a POST request to the API with the JSON data
            const response = await axios.post(`${backend}predict_whiteflies`, climateData);

            // Handle the response from the API (replace this with your own logic)
            const result = response.data; // Assuming the API returns the result in JSON format
            navigation.navigate('Spread Result', { status: result.status, name:"Whiteflies"});
            console.log(result.status);
        } catch (error) {
            console.error('Error sending request:', error);
        }

    }

    const antraconosForecast = async () => {
        const climateData = {
            temperature: avgTemp,
            humidity: avgHumidity,
        };
        try {
            // Send a POST request to the API with the JSON data
            const response = await axios.post(`${backend}predict_antraconos`, climateData);

            // Handle the response from the API (replace this with your own logic)
            const result = response.data; // Assuming the API returns the result in JSON format
            navigation.navigate('Spread Result', { status: result.status, name:"Anthracnose" });
            console.log(result.status);
        } catch (error) {
            console.error('Error sending request:', error);
        }

    }

    const bacterialForecast = async () => {
        const climateData = {
            temperature: avgTemp,
            humidity: avgHumidity,
        };
        try {
            // Send a POST request to the API with the JSON data
            const response = await axios.post(`${backend}predict_bacterial_blight`, climateData);

            // Handle the response from the API (replace this with your own logic)
            const result = response.data; // Assuming the API returns the result in JSON format
            navigation.navigate('Spread Result', { status: result.status, name:"Bacterial Blight" });
            console.log(result.status);
        } catch (error) {
            console.error('Error sending request:', error);
        }

    }



    return (
        <View className='w-screen h-screen'>
            <View className="p-2 mb-4 bg-white" style={{ elevation: 10 }}>
                <View className="w-screen">
                    <Text className="px-4 py-2 text-xl font-semibold">Last 24 Houres Climate</Text>
                </View>
                <View className="">
                    <Text className="p-2 text-xl font-bold text-center text-primary">Temperature</Text>
                    <View className="items-center">
                        <View className="w-[80%] h-4 bg-yellow-500 rounded-xl"
                            style={{ elevation: 10 }}
                        ></View>
                        <View className="flex flex-row justify-between w-[80%]">
                            <Text className="font-bold ">Min: {minTemp}</Text>
                            <Text className="font-bold ">Avg: {avgTemp}</Text>
                            <Text className="font-bold ">Max: {maxTemp}</Text>
                        </View>
                    </View>
                </View>
                <View className="p-2">
                    <Text className="p-2 text-xl font-bold text-center text-primary">Humidity</Text>
                    <View className="items-center">
                        <View className="w-[80%] h-4 bg-blue-400 rounded-xl"
                            style={{ elevation: 10 }}
                        ></View>
                        <View className="flex flex-row justify-between w-[80%]">
                            <Text className="font-bold ">Min: {minHumidity}%</Text>
                            <Text className="font-bold ">Avg: {avgHumidity}%</Text>
                            <Text className="font-bold ">Max: {maxHumidity}%</Text>
                        </View>
                    </View>
                </View>
            </View>


            <View>
                <View className='items-center w-screen '>
                    <Text className="p-4 text-xl font-bold text-center" >Cheack The Spread of Diseases and Pests Below</Text>
                    <View className="flex-row gap-2">
                        <TouchableOpacity onPress={aphidForecast} >
                            <View className="p-2 bg-white rounded-md" style={{ elevation: 10 }}>
                                <Image className="w-[120px] h-[120px] rounded-md" source={Aphid} />
                                <Text className="font-bold text-center text-black">Aphid</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={whiteFliesForecast}>
                            <View className="p-2 bg-white rounded-md" style={{ elevation: 10 }}>
                                <Image className="w-[120px] h-[120px] rounded-md" source={Whiteflie} />
                                <Text className="font-bold text-center text-black">Whiteflies</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row gap-2 mt-1">
                        <TouchableOpacity onPress={antraconosForecast}>
                            <View className="p-2 bg-white rounded-md" style={{ elevation: 10 }}>
                                <Image className="w-[120px] h-[120px] rounded-md" source={Antraconos} />
                                <Text className="font-bold text-center text-black">Anthracnose</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={bacterialForecast}>
                            <View className="p-2 bg-white rounded-md" style={{ elevation: 10 }}>
                                <Image className="w-[120px] h-[120px] rounded-md" source={Bacterial} />
                                <Text className="font-bold text-center text-black">Bacterial Blight</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DiseaseForcast;
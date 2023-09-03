import { View, Text, Image, ImageBackground } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import Back from "../assets/cli.png";
import babelConfig from '../../babel.config';
import { LineChart } from 'react-native-chart-kit';
import Chart from './Chart';
import { AuthContext } from '../auth/AuthProvider';


const ClimateHome = () => {

  const [humidity, setHumidity] = useState('');
  const [temperature, setTemperature] = useState('');
  const { user } = useContext(AuthContext);



  const getClimate = async () => {
    try {
      const response = await axios.get(`http://192.168.119.130/api/data/DH0001`);
      if (response) {
        setHumidity(response.data.humidity);
        setTemperature(response.data.temperature);
      } else {
        console.log('Error getting data');
      }
    } catch (error) {
      //console.log("An error occurred:", error.message);
    }
  };

  useEffect(() => {

    getClimate(); // Initial call

    const interval = setInterval(() => {
      getClimate(); // Fetch climate data every 5 seconds
    }, 10000); // Interval in milliseconds (5 seconds)

    return () => {
      clearInterval(interval); // Clear interval when component unmounts
    };
  }, []);

  return (
    <View className="w-screen h-screen">
      <ImageBackground
        source={Back} // Change to your image path
        className="h-[50%] bg-center bg-no-repeat  "
      >
        <View className="flex-row justify-between w-screen gap-1 px-4 mx-auto max-w-[80%]  mt-12 ">
          <View className="text-center">
            {temperature !== '' ? (
              <>
                <Text className="text-4xl font-semibold text-center text-white">{temperature}°C</Text>
                <Text className="text-lg text-center text-white"> Temperature</Text>
              </>
            ) : (
              <Text className="text-lg font-semibold text-white">Device Offline</Text>
            )}
          </View>
          <View className="text-center">
            {humidity !== '' ? (
              <>
                <Text className="text-4xl font-semibold text-center text-white">{humidity}%</Text>
                <Text className="text-lg text-center text-white">Current Humidity</Text>
              </>
            ) : (
              <Text className="text-lg font-semibold text-white">Device Offline</Text>
            )}
          </View>
        </View>
        <View className="items-center w-screen mt-24">
          <Chart />
          <Chart />
        </View>

      </ImageBackground>

    </View>

  )
}

export default ClimateHome
import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'

const Currentclimate = () => {

    const [humidity, setHumidity] = useState('');
    const [temperature, setTemperature] = useState('');

    const getClimate = async () => {
        try {
          const response = await axios.get(`http://192.168.226.130/api/data/DH0001`);
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
        <View className="flex-row justify-between w-screen gap-1 px-4 mx-auto max-w-[80%] py-8 ">
            <View className="flex items-center justify-center p-4 bg-white rounded-lg w-36 h-[150px]">
                {temperature !== '' ? (
                    <>
                        <Text className="text-3xl font-semibold text-primary">{temperature}°C</Text>
                        <Text className="text-lg text-center text-gray-500">Current Temperature</Text>
                    </>
                ) : (
                    <Text className="text-lg font-semibold text-gray-500">Device Offline</Text>
                )}
            </View>
            <View className="flex items-center justify-center p-4 bg-white rounded-lg w-36 h-[150px]">
                {humidity !== '' ? (
                    <>
                        <Text className="text-3xl font-semibold text-primary">{humidity}%</Text>
                        <Text className="text-lg text-center text-gray-500">Current Humidity</Text>
                    </>
                ) : (
                    <Text className="text-lg font-semibold text-gray-500">Device Offline</Text>
                )}
            </View>
        </View>
    )
}

export default Currentclimate
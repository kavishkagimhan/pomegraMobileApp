import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AuthContext } from '../auth/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const Chart = () => {

  const { user } = useContext(AuthContext);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [climate, setClimateData] = useState([]);
  const [hourArray, setHourArray] = useState([]);

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


  // Calculate average, max, and min values for temperature and humidity arrays




  const data = {
    labels: hourArray,
    datasets: [
      {
        data: [10, 65, 28, 80, 99, 10, 65, 28, 80],
        color: (opacity = 1) => `rgba(158, 65, 244, ${opacity})`, // Line color
        strokeWidth: 2, // Line width
      },
    ],
  };

  return (
    <View>
      <View >
        <Text className="text-lg font-semibold text-black">Last 24 Hours Temperature</Text>
        <LineChart
          data={data}
          width={350}
          height={180}
          yAxisSuffix="c"
          withInnerLines={false}
          withOuterLines={false}
          chartConfig={{
            backgroundColor: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 2, // Number of decimal places for labels
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
            yAxisInterval: 10, // Set the y-axis interval to 10 (0 to 100 in increments of 10)
          }}
          style={styles.chart}
        />
      </View>
      <View >
      <Text className="text-lg font-semibold text-black">Last 24 Hours Humidity</Text>
      <LineChart
        data={data}
        width={350}
        height={180}
        yAxisSuffix="%"
        withInnerLines={false}
        withOuterLines={false}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 2, // Number of decimal places for labels
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
          yAxisInterval: 10, // Set the y-axis interval to 10 (0 to 100 in increments of 10)
        }}
        style={styles.chart}
      />
    </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Chart;
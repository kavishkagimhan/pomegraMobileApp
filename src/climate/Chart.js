import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Chart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        data: [10, 65, 28, 80, 99, 10, 65, 28, 80], 
        color: (opacity = 1) => `rgba(158, 65, 244, ${opacity})`, // Line color
        strokeWidth: 2, // Line width
      },
    ],
  };

  return (
    <View >
        <Text className="text-lg font-semibold text-black">Last 24 Hours Temperature</Text>
      <LineChart
        data={data}
        width={350}
        height={180}
        yAxisLabel="$"
        yAxisSuffix="k"
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

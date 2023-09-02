import { View, Text, TouchableOpacity } from 'react-native'
import React,{useContext, useState, useEffect} from 'react'
import { AuthContext } from '../auth/AuthProvider';
import firestore from '@react-native-firebase/firestore';


const Profile = () => {

  const { logout, user } = useContext(AuthContext);
  const [data, setData] = useState("");

  
  useEffect(() => {
    // Function to fetch data by ID
    const fetchWeatherDataById = async () => {
      try {
        const docRef = firestore().collection('weatherData').doc(user.uid); // Assuming user.uid is the document ID
        const doc = await docRef.get();

        if (doc.exists) {
          // Document exists, you can access its data
          const weatherData = doc.data();
          console.log(weatherData)
          setData(weatherData);
        } else {
          // Document does not exist
          setData(null);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherDataById();
  }, [user.uid]); // Fetch data when user.uid changes
  
  return (
    <View className="flex items-center h-screen">
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => logout()} className="w-[80%] px-2 py-1 bg-primary text-center h-12 items-center mt-6">
        <Text className="text-lg font-bold text-white">Logout</Text>
      </TouchableOpacity>
      <Text>{user.uid}</Text>
    </View>
  )
}

export default Profile
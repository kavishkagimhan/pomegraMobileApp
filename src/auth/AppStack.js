import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Disease from '../diseases/Disease';
import Quality from '../quality/Quality';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Profile from '../screens/Profile';
import ClimateHome from '../climate/ClimateHome';
import SoilHome from '../soil/SoilHome';
import FindDisease from '../diseases/FindDisease';
import FindQuality from '../quality/FindQuality';
import DiseaseResult from '../diseases/DiseaseResult';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



const HomeStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen options={{headerShown:false}} name="Homea" component={Home} />
    <Stack.Screen name="Disease" component={Disease} />
    <Stack.Screen name="Find" component={FindDisease} />
    <Stack.Screen name="FindQuality" component={FindQuality} />
    <Stack.Screen name="Quality" component={Quality} />
    <Stack.Screen name="Climate" component={ClimateHome} />
    <Stack.Screen name="Soil" component={SoilHome} />
    <Stack.Screen name="DiseaseResult" component={DiseaseResult} />
  </Stack.Navigator>
);




const AppStack = () => {

  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#DE1B55',
        backgroundColor: '#DE1B55',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => ({
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={35}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Di"
        component={Disease}
        options={({ route }) => ({
          tabBarLabel: 'Setting',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="setting"
              color={color}
              size={30}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => ({
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="user"
              color={color}
              size={30}
            />
          ),
        })}
      />
    </Tab.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}



export default AppStack
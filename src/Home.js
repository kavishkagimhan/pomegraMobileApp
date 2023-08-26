import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext} from 'react';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from './auth/AuthProvider';


const Home = () => {

  const {user} = useContext(AuthContext)
  const {logout} = useContext(AuthContext);
  
  const navigation = useNavigation();

  const handleDisease = () => {
    // Navigate to ForgotPassword screen
    navigation.navigate('Disease');
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.myTitle} className="p-4 bg-black shadow-2xl rounded-xl shadow-blue-600">Home</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleDisease}>Diseases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Quality button pressed')}>
            <Text style={styles.buttonText}>Quality</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Climate button pressed')}>
            <Text style={styles.buttonText}>Climate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Soil button pressed')}>
            <Text style={styles.buttonText}>Soil</Text>
            <Text>{user.uid}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            console.log("Log out")
            logout()}}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
   height: '100%',
   width: '100%',
  },
  scrollViewContent: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 20,
  },
  myTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;

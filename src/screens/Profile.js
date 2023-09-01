import { View, Text, TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import { AuthContext } from '../auth/AuthProvider';

const Profile = () => {

  const { logout } = useContext(AuthContext);
  
  return (
    <View className="flex items-center h-screen">
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => logout()} className="w-[80%] px-2 py-1 bg-primary text-center h-12 items-center mt-6">
        <Text className="text-lg font-bold text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile
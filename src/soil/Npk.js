import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Npk = () => {

  const [treatment, setTreatment] = useState("dfdnfgfneghegv jfgjfigjrigij hthtrhrhtrhthhthhtrhhhrhrtheheghgr")

  
  return (
    <View className="w-screen h-screen ">
      <Text className="p-4 text-2xl font-semibold text-center text-primary">Enter NPK Levels</Text>
      <View className="flex flex-row items-center justify-center mt-4">
        <Text className="text-black ">N : </Text>
        <TextInput
          className="px-2 py-1  text-black bg-white dark:text-black w-[70%] text-lg border border-primary rounded-md "
          placeholder='Enter Nitrogen Level'
        />
      </View>
      <View className="flex flex-row items-center justify-center mt-4">
        <Text className="text-black ">P : </Text>
        <TextInput
          className="px-2 py-1  text-black bg-white dark:text-black w-[70%] text-lg border border-primary rounded-md "
          placeholder='Enter Posperous Level'
        />
      </View>
      <View className="flex flex-row items-center justify-center mt-4">
        <Text className="text-black ">K : </Text>
        <TextInput
          className="px-2 py-1  text-black bg-white dark:text-black w-[70%] text-lg border border-primary rounded-md "
          placeholder='Enter Pottasium Level'
        />
      </View>
      <View className='flex items-center mt-8 '>
        <TouchableOpacity className="w-[80%] rounded-md px-2 py-1 bg-primary text-center h-12 items-center mt-6 " >
          <Text className="text-lg font-bold text-white">Trreatment</Text>
        </TouchableOpacity>
      </View>
      <View className="flex items-center justify-start mt-8">
        <Text className='p-4 text-lg text-black bg-white rounded-md h-[150px] w-[70%]'>
          {treatment}
        </Text>
      </View>
      <View className='flex items-center mt-8 'style={{ elevation: 10 }}>
        <TouchableOpacity className="w-[50%] rounded-md px-2 py-1 bg-primary text-center h-12 items-center mt-6 " >
          <Text className="text-lg font-bold text-white">Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Npk
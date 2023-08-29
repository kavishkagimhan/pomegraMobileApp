import { View, Text } from 'react-native'
import React from 'react'

const DiseaseResult = ({ route }) => {

  const { validate, disease } = route.params;


  return (
    <View>
      <Text className="justify-center text-center text-black">{validate}</Text>
      <Text className="justify-center text-center text-black">{disease}</Text>
    </View>
  )
}

export default DiseaseResult
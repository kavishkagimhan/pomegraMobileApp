import { Text, TouchableOpacity } from 'react-native';
import React from 'react'

const Button = ({name}) => {
    return (
        <TouchableOpacity className="w-[80%] px-2 py-1 bg-primary text-center h-12 items-center mt-6">
            <Text className="text-lg font-bold text-white">{name}</Text>
        </TouchableOpacity>
    )
}

export default Button
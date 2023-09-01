import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Btn = ({name}) => {
    return (
        <TouchableOpacity className="mt-4">
            <LinearGradient style={{ elevation: 10 }} colors={['#059669', '#34d399']} className="px-4 py-2 rounded-xl w-[250px] items-center">
                    <Text className="text-lg text-white">{name}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default Btn
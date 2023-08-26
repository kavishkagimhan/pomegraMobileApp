import { TextInput } from 'react-native'
import React from 'react'

const Input = ({ placeholder }) => {
    return (
        <TextInput
            className="px-2 py-1  text-black bg-white dark:text-black w-[80%] text-lg border border-primary rounded-md "
            placeholder={placeholder}
        />
    )
}

export default Input
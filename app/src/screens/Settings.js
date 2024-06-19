import React from 'react'
import { View, Text } from "react-native"
import Feather from "@expo/vector-icons/Feather"

const Settings = () => {
  return (
    <View>
        <Text>Settings</Text>
        <Feather name = "home" size = {24} color ="red" />
    </View>
  )
}

export default Settings
import React from 'react'
import Home from '../screens/Home'
import Settings from '../screens/Settings'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Feather from "@expo/vector-icons/Feather"

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#03A9F1",
            tabBarInactiveTintColor: "#444",
            tabBarStyle: {
                backgroundColor: "rgba(0,0,0,.25)"
            },
            headerShown: false
          }}
        >
        <Tab.Screen name = {'Home'} component = {Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather name = "home" size = {24} color = {focused ? "#03A9F1": "#333"} />
            )
          }}
        />
        <Tab.Screen name = {'Settings'} component = {Settings}
          options = {{
            tabBarIcon: ({ focused }) => (
              <Feather name='settings' size = {24}  color = {focused ? "#03A9F1": "#333"}/>
            )
          }}
        />
        </Tab.Navigator>
    )
}

export default Tabs
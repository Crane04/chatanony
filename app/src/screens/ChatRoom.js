import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import Header from '../components/Header'
const ChatRoom = () => {
  return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.header}>
                <Header />
            </View>
            <Text>hhh</Text>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:  "#292f3f",
        // marginTop: StatusBar.height || 0
    },
    header: {
        height: 90
    },
})

export default ChatRoom
import React from 'react'
import {Text, View, SafeAreaView, StyleSheet } from 'react-native'
import Header from './Header'
import RecentMessages from './RecentMessages'
const Home = () => {
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.header}>
            <Header />
        </View>

        <View style = {styles.recentMessages}>
            <RecentMessages />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:  "#292f3f"
    },
    header: {
        height: 120
    },
    recentMessages: {
        flex: 1,
    }
})

export default Home
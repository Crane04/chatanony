import React from 'react'
import {Text, View, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import Header from '../components/Header'
import RecentMessages from '../components/RecentMessages'

const Home = () => {
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.header}>
            <Header page = {'Home'} />
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
        backgroundColor:  "#292f3f",
        marginTop: StatusBar.height || 0
    },
    header: {
        height: 120
    },
    recentMessages: {
        flex: 1,
    }
})

export default Home
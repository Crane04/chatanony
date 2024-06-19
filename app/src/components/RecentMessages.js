import React from 'react'
import { View, FlatList,StyleSheet } from 'react-native'
import data from '../utils/data'
import Message from './ListRecentMessages'

const RecentMesssges = () => {
    return (
        <View style = {styles.container}>
            
            <FlatList 
                data = {data}
                renderItem = {({item}) => <Message item = {item}/>}
                keyExtractor = {(item, index) => index}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20
    },

})

export default RecentMesssges
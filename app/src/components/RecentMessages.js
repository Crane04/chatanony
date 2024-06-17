import React from 'react'
import {Text, View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import data from '../utils/data'

const Message = ({item}) => {
    const { group_name, last_message, date } = item
    return (
        <TouchableOpacity style = {styles.messagesContainer}>
            <View style = {styles.left}>
                <Image 
                    style = {styles.image}
                    source = {require("../../assets/chatanony.png")}
                />
                <View style = {styles.msg}>
                    <Text style = {styles.msgUp}>{ group_name }</Text>
                    <Text style = {styles.msgDown}>
                        {
                            last_message.length == last_message.substring(0,25) ?
                            last_message :
                            last_message.substring(0,25) + "..."
                        }
                    </Text>
                </View>
            </View>

            <View style = {styles.right}>
                <Text style = {styles.time}>{ date }</Text>
            </View>
        </TouchableOpacity>
    )
}

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
    messagesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 25,
        marginBottom: 25
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 15
    },
    left: {
        flexDirection: "row",
        alignItems: "center"
    },
    msg: {
        height: 45,
        justifyContent: 'space-between',
    },
    right: {
        marginRight: 20
    },
    msgUp: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold"
    },
    msgDown: {
        fontSize: 17,
        color: "#ccc"
    },
    time: {
        color: "#ccc"
    }
})

export default RecentMesssges
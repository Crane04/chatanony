import React from 'react'
import {Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons';
import FontAwesome from "@expo/vector-icons/FontAwesome"
import AntDesign from "@expo/vector-icons/AntDesign"

const Header = () => {
  return (
    <View style = {styles.container}>
        <View style =  {styles.branding}>
            <View style = {styles.left}>
                <Image 
                    style = {styles.logo}
                    source = {require("../../assets/chatanony.png")}
                />
                <Text style = {styles.brand}>ChatAnony</Text>
            </View>
        </View>
        <View style = {styles.searchAdd}>
                <View style = {styles.searchBox}>
                    <TextInput style = {styles.search} placeholder='Search...' placeholderTextColor={"#ffffff"} />
                    <TouchableOpacity style = {styles.searchIcon}>
                        <FontAwesome name = "search" size = {24} color = "white" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style = {styles.add}>
                    <AntDesign name = "plus" size = {24} color = "white" />
                </TouchableOpacity>
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "column",
        flex: 1,
        marginLeft: 20,
        marginRight: 20
    },
    branding: {
        marginBottom: 15
    },
    right: {
        marginRight: 20
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
    },
    brand: {
        color: "#fff",
        fontSize: 25,
    },
    logo: {
        width: 40,
        height: 40,
        padding: 0,
        marginRight: 20
    },
    searchAdd: {
        flexDirection: "row",
        alignItems: "center"
    },
    searchBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        height: 40,
    },
    search: {
        backgroundColor: "rgba(0,0,0,.25)",
        flex: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        height: 40,
        color: "#ffffff",
        paddingLeft: 10,
        paddingRight: 10
    },
    searchIcon: {
        backgroundColor: "#565E70",
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    add: {
        backgroundColor: "#03A9F1",
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 12,
        borderRadius: 10
    }
})

export default Header
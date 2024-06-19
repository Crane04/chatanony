import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import ExpoFastImage from 'expo-fast-image';
import Search from "./Search"

const Header = ({page}) => {
  return (
    <View style = {styles.container}>
        <View style =  {styles.branding}>
            <View style = {styles.left}>
                {
                    page == "Home" && 
                    <ExpoFastImage 
                    style = {styles.logo}
                    source = {require("../../assets/chatanony.png")}
                />
                }

                <Text style = {styles.brand}>ChatAnony</Text>
            </View>
        </View>
        {
            page == "Home" && 
            <Search />
        }
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
})

export default Header
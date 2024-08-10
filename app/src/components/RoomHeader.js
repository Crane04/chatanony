import React from 'react'
import {Text, View, StyleSheet, SafeAreaView} from 'react-native'
import ExpoFastImage from 'expo-fast-image';
import { useNavigation } from '@react-navigation/native';

const Header = ({route}) => {
    const navigation = useNavigation()
    const { name } = route.params.group;
  return (
    <SafeAreaView style = {styles.container}>
        <View style =  {styles.branding}>
            <View style = {styles.left}>
                
                 <ExpoFastImage 
                    style = {styles.logo}
                    source = {require("../../assets/chatanony.png")}

                />

                <Text style = {styles.brand}>
                    { name }
                </Text>
                
            </View>

        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#292f3f",    
        elevation: 10,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    branding: {
        marginBottom: 15,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20
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
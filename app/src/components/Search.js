import FontAwesome from "@expo/vector-icons/FontAwesome"
import AntDesign from "@expo/vector-icons/AntDesign"
import {View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Search = () => {
    
    const navigation = useNavigation()
    return (
        
        <View style = {styles.searchAdd}>
            <View style = {styles.searchBox}>
                <TextInput style = {styles.search} placeholder='Search...' placeholderTextColor={"#ffffff"}  />
                <TouchableOpacity style = {styles.searchIcon}>
                    <FontAwesome name = "search" size = {24} color = "white" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style = {styles.add} onPress={() => {navigation.navigate("CreateChat")}}>
                <AntDesign name = "plus" size = {24} color = "white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchAdd: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft:30,
        marginRight: 20,
        marginBottom: 10
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

export default Search
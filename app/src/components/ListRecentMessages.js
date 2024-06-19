import {Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import ExpoFastImage from 'expo-fast-image'
import { useNavigation } from '@react-navigation/native'

const Message = ({item}) => {

    const { group_name, last_message, date, image } = item
    const navigation = useNavigation()
    return (
        <TouchableOpacity style = {styles.messagesContainer}
            onPress = {() => navigation.navigate("ChatRoom")}
        >
            <View style = {styles.left}>
            <ExpoFastImage
                style={styles.image}
                source={image ? { uri: image } : require('../../assets/chatanony.png')}
            />
                <View style = {styles.msg}>
                    <Text style = {styles.msgUp}>{ group_name }</Text>
                    <Text style = {styles.msgDown}>
                        {
                            last_message.length != last_message.substring(0,25) ?
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

const styles = StyleSheet.create({
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
        marginRight: 15,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#03A9F1"
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

export default Message
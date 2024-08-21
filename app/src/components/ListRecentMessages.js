import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../utils/convertTime';

const Message = ({ item }) => {
    const { id, last_message, time, image, name } = item;
    const navigation = useNavigation();
    const image_ = image ? { uri: image } : require('../../assets/chatanony.png');
    const displayedMessage = last_message ? last_message : "image";

    return (
        <TouchableOpacity 
            style={styles.messagesContainer}
            onPress={() => {
                navigation.navigate('ChatRoom', {
                    group: {
                        created_at: time, 
                        group_id: id, 
                        name: name,
                        image: image_
                    }  
                });
            }}
        >
            <View style={styles.left}>
                <ExpoFastImage
                    style={styles.image}
                    source={image_}
                />
                <View style={styles.msg}>
                    <Text style={styles.msgUp}>{name}</Text>
                    <Text style={styles.msgDown}>
                        {displayedMessage.length > 25 
                            ? displayedMessage.substring(0, 25) + "..." 
                            : displayedMessage
                        }
                    </Text>
                </View>
            </View>

            <View style={styles.right}>
                <Text style={styles.time}>{formatDate(time)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    messagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 25,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 15,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#03A9F1',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msg: {
        height: 45,
        justifyContent: 'space-between',
    },
    right: {
        marginRight: 20,
    },
    msgUp: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    msgDown: {
        fontSize: 17,
        color: '#ccc',
    },
    time: {
        color: '#ccc',
    },
});

export default Message;

import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import RecentChatsContext from '../contexts/RecentChatsContext';

const TextArea = ({ text, selectedImage, setSelectedImage, action, SendMessage, setMessages, scrollToBottom, setReplyingTo, replyingTo, group_id, groupData }) => {
  // const [selectedImage, setSelectedImage] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { updateRecentChats } = useContext(RecentChatsContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.mainContainer}>
      {replyingTo && (
        <View style={styles.replyingToBox}>
          <Text>{replyingTo.slice(0, 50)}</Text>
          <TouchableOpacity onPress={() => setReplyingTo("")}>
            <MaterialIcons name="cancel" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}

      {selectedImage && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.removeImage}>
              <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}

      <KeyboardAvoidingView
        style={[styles.container, isKeyboardVisible && { marginBottom: 20 }]} // Apply marginBottom when the keyboard is visible
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >

        <View style={styles.boxSend}>
          <TextInput
            style={styles.textArea}
            placeholder="Type a message..."
            placeholderTextColor="gray"
            multiline={true}
            value={text}
            onChangeText={action}
          />

          <TouchableOpacity style={styles.image} onPress={pickImage}>
            <Entypo name="camera" size={24} color="black" />
          </TouchableOpacity>


        </View>
        {
          (text || selectedImage) && (
            <TouchableOpacity
            style={styles.send}
            onPress={() => 
              SendMessage({ 
                text, 
                setText: action,
                replyingTo,
                setReplyingTo,
                setMessages,
                scrollToBottom,
                group_id,
                image: selectedImage, 
                setSelectedImage, 
                updateRecentChats,
                groupData
               })}
            >
              <FontAwesome name="send-o" size={24} color="rgba(225,225,225,.55)" />
          </TouchableOpacity>
          )
        }

      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  replyingToBox: {
    backgroundColor: 'rgba(225,225,225,.55)',
    margin: 3,
    padding: 4,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: "row",
  },
  boxSend: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 7,
  },
  send: {
    backgroundColor: "#373E4E",
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  image: {
    backgroundColor: "#03A9F1",
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  textArea: {
    height: 45,
    flex: 1,
    padding: 10,
    borderColor: 'rgba(0,0,0,.25)',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'rgba(0,0,0,.25)',
    color: "#fff",
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeImage: {},
});

export default TextArea;

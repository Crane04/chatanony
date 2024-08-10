import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const TextArea = () => {
  const [text, setText] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10} // Adjust this offset based on your layout needs
    >
      <View style={styles.boxSend}>
        <TextInput
          style={styles.textArea}
          placeholder="Type something..."
          placeholderTextColor="gray"
          multiline={true}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.send}>
          <FontAwesome name="send-o" size={24} color="rgba(225,225,225,.55)" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.image}>
        <Entypo name="camera" size={24} color="black" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  image: {
    backgroundColor: "#03A9F1",
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textArea: {
    height: 45,
    flex: 1,
    padding: 10,
    borderColor: 'rgba(0,0,0,.25)',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'rgba(0,0,0,.25)', // Ensure background is 
    color: "#fff",
  },
});

export default TextArea;

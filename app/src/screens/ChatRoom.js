import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Text } from 'react-native';
import TextArea from "../components/TextArea"
import Messages from '../components/Messages';
import getMessages from '../utils/getMessages';
import Entypo from '@expo/vector-icons/Entypo';

const ChatRoom = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const { group_id } = route.params.group;

  useEffect(() => {
    async function fetchMessages() {
      const messages_ = await getMessages(group_id);
      console.log(messages_)
      if (messages_.error) return;
      setMessages(messages_.data);
      setLoading(false);
    }
    fetchMessages();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messagesContainer}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Messages data={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyComponent}>
              {loading ? (
                <ActivityIndicator size="large" color="#4e89c7" />
              ) : (
                <>
                  <Entypo name="chat" size={150} color="rgba(0,0,0,.25)" />
                  <Text style={styles.emptyText}>Send the first message</Text>
                </>
              )}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        style={styles.textBoxContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.textBox}>
            <TextArea />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292f3f",
  },
  messagesContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 40,
    marginTop: 20,
  },
  separator: {
    marginTop: 10,
  },
  textBoxContainer: {
    // padding: 10,
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  emptyText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Noteworthy",
    textAlign: "center",
  },
});

export default ChatRoom;

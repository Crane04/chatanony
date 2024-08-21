import React, { useEffect, useState, useRef, useContext } from "react";
import { View, SafeAreaView, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Text, Alert } from 'react-native';
import TextArea from "../components/TextArea";
import Messages from '../components/Messages';
import getMessages from '../utils/getMessages';
import Entypo from '@expo/vector-icons/Entypo';
import SendMessage from "../utils/sendMessage";
import RecentChatsContext from '../contexts/RecentChatsContext';


const ChatRoom = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [replyingTo, setReplyingTo] = useState("");
  const [groupData, setGroupData] = useState(null);
  const [socket, setSocket] = useState(false);
  const flatListRef = useRef(null);
  const { updateRecentChats } = useContext(RecentChatsContext);

  const { group_id } = route.params.group;

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };


  useEffect(() => {
    async function fetchMessages() {
      try {
        const messages_ = await getMessages(group_id);
        if (messages_.error) {
          console.error("Error fetching messages:", messages_.error);
          return;
        }

        setMessages(messages_.data);
        setGroupData(messages_.group_data);
  
        setLoading(false);
      } catch (error) {
        console.error("Error in fetchMessages:", error);
      }
    }

    fetchMessages();
  }, [group_id]); // Ensure that group_id is passed as a dependency
  const ws = new WebSocket(`wss://chatanony-wss.onrender.com/chat/${group_id}`);
  useEffect(() => {

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);

      updateRecentChats({
        id: group_id,
        name: groupData.name,
        last_message: message.message,
        time: message.time,
        image: groupData.image
      });
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, [group_id]);

  const handleSendMessage = async () => {
    if (text.trim()) {

      if(!selectedImage){
        ws.send(JSON.stringify({
          message: text,
          group_id,
          time: new Date().toISOString(),
        }));
        await SendMessage({
          text,
          setText,
          replyingTo,
          setReplyingTo,
          setMessages,
          scrollToBottom,
          group_id,
          image: selectedImage,
          setSelectedImage,
          groupData,
          updateRecentChats
        });
      }
      else{
        const resp = await SendMessage({
          text,
          setText,
          replyingTo,
          setReplyingTo,
          setMessages,
          scrollToBottom,
          group_id,
          image: selectedImage,
          setSelectedImage,
          groupData,
          updateRecentChats
        });
  
        // Emit the new message to the server
        // if (socketConnected) {
          ws.send(JSON.stringify({
            message: text,
            group_id,
            time: new Date().toISOString(),
            image: resp.image
          }));
      }

      } else {
        Alert.alert("Error", "Socket is not connected.");
      }
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messagesContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <Messages data={item} setReplyingTo={setReplyingTo} />}
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
          onContentSizeChange={scrollToBottom} // Scroll to the bottom whenever content size changes
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        style={styles.textBoxContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.textBox}>
            <TextArea 
              text={text} 
              action={setText} 
              SendMessage={handleSendMessage}
              setMessages={setMessages} 
              scrollToBottom={scrollToBottom} 
              setReplyingTo={setReplyingTo}
              replyingTo={replyingTo}
              group_id={group_id}
              groupData={groupData}
              selectedImage = {selectedImage}
              setSelectedImage = {setSelectedImage}
            />
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

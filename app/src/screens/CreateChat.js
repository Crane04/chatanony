import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import createChat from '../utils/createChat';

const width = Dimensions.get("window").width;
const portfolioUrl = 'https://github.com/Crane04';

const CreateChat = ({navigation}) => {
  const [groupName, setGroupName] = useState(""); // group id after it has been created
  const [loading, setLoading] = useState(false); // Loading state
  const [createdChat, setCreatedChat] = useState(false)

  const createNewChat = async () => {
    setLoading(true); // Set loading to true
    console.log("running");
    try {
      const response = await createChat(groupName);
      console.log(response)
      if (response.name){
        setCreatedChat(true)
        setGroupName(response)
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    } finally {
      setLoading(false); // Set loading to false after response or error
    }
  };

  // if(!createdChat){
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>

          <View style={styles.innerContainer}>
            {
              !createdChat ? 
                <>
                  <TextInput 
                    style={styles.textInput} 
                    placeholder="Enter chat name" 
                    placeholderTextColor="#ccc" 
                    value={groupName}
                    onChangeText={setGroupName}
                  />

                  <TouchableOpacity style={styles.button} onPress={createNewChat} disabled={loading}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Create New Chat</Text>
                    )}
                  </TouchableOpacity>
                </> :
                <>
                  <View style = {styles.congrats}>
                  <Text style = {styles.congratsText}> Yippeee!!!😁😁😍😗🥰💃 </Text>
                  <Text style = {styles.congratsText}> You've successfully created a new Chat </Text>
                  </View>
                  <View style = {styles.roomName}>
                    <Text style = {styles.roomText}>https://chatanony.netlify.app/chat/{groupName.group_id}</Text>
                  </View>

                  <View style = {styles.btns}>
                    <TouchableOpacity style = {styles.button}>
                      <Text style = {styles.buttonText}>Copy Link</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.button} onPress = {() => {navigation.navigate("ChatRoom", {
                      "group": groupName
                    })}}>
                      <Text style = {styles.buttonText}>Go to Chat Room</Text>
                    </TouchableOpacity>
                  </View>
                </>
            }

          </View>
        </TouchableWithoutFeedback>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Created by </Text>
          <TouchableOpacity onPress={() => Linking.openURL(portfolioUrl)}>
            <Text style={[styles.footerText, styles.footerLink]}>Crane04</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292f3f",
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: "center",
    flex: 1,
  },
  textInput: {
    height: 45,
    width: width * 0.8, // 80% of screen width
    padding: 10,
    borderColor: 'rgba(0,0,0,.25)',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,.25)',
    color: "#fff",
    marginBottom: 20, // Add some margin between the input and the button
  },
  btns: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10
  },
  button: {
    backgroundColor: '#03A9F1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  roomName: {
    backgroundColor: "rgba(0,0,0,.25)",
    padding: 15,
    borderColor: "rgba(0,0,0,.96)",
    borderWidth: 2,
    borderRadius: 5
  },
  roomText: {
    color: "#fff"
  },
  congrats: {
    margin: 20,
    alignItems: "center"
  },
  congratsText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Noteworthy",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  footerLink: {
    color: '#4e89c7',
    textDecorationLine: 'underline',
  }
});

export default CreateChat;
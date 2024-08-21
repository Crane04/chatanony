import React, { useState, useRef, useMemo } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback, Image, Modal, TouchableOpacity } from "react-native";
import { getRandomEmoji } from "../utils/emojis";
import { formatDate } from "../utils/convertTime";
import ExpoFastImage from 'expo-fast-image';


const Messages = ({ data, setReplyingTo }) => {
  const { message, time, replied, image } = data;
  const [lastTap, setLastTap] = useState(null);
  const timeoutRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  const emoji = useMemo(() => getRandomEmoji(), []);

  const handleDoubleTap = () => {
    setReplyingTo(message.slice(0, 50));
  };

  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300; // milliseconds

    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      clearTimeout(timeoutRef.current); // Clear the single tap timeout
      handleDoubleTap();
    } else {
      setLastTap(now);

      timeoutRef.current = setTimeout(() => {
        // Handle single tap here if needed
        console.log("Single tap detected");
      }, DOUBLE_PRESS_DELAY);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handleTap}>
        <View style={styles.unitMessage}>
          <View style={styles.emoji}>
            <Text style={styles.emojiText}>{emoji}</Text>
          </View>
          <View style={styles.inMessage}>
            {replied && (
              <View style={styles.messageReply}>
                <Text style={styles.reply}>{replied}</Text>
              </View>
            )}
            {image && (
              <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <ExpoFastImage source={{ uri: image }} style={styles.messageImage} />
              </TouchableWithoutFeedback>
            )}
            <Text style={styles.messageContent}>{message}</Text>
            <Text style={styles.messageTime}>{formatDate(time)}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {image && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
            <ExpoFastImage source={{ uri: image }} style={styles.fullScreenImage} />
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inMessage: {
    backgroundColor: "#373E4E",
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 12,
    maxWidth: "80%",
    flexShrink: 1,
  },
  messageContent: {
    color: "#ffffff",
    fontSize: 16,
  },
  emoji: {
    backgroundColor: "#03A9F1",
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
  },
  emojiText: {
    fontSize: 20,
  },
  unitMessage: {
    flexDirection: "row",
    marginBottom: 10,
  },
  messageTime: {
    textAlign: "right",
    color: "#aef",
  },
  messageReply: {
    backgroundColor: "rgba(44, 50, 62, 1)",
    color: "#ddd",
    padding: 5,
    borderLeftColor: "#03A9F1",
    borderLeftWidth: 4,
    borderWidth: 4,
    borderColor: "transparent",
    marginVertical: 5,
  },
  reply: {
    color: "#ddd",
  },
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default Messages;

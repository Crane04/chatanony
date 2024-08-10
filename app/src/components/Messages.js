import React from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { getRandomEmoji } from "../utils/emojis";
import { formatDate } from '../utils/convertTime';

const Messages = ({ data }) => {
  const { message, time, replied } = data;


  return (
    <View style={styles.unitMessage}>
      <View style={styles.emoji}>
        <Text style={styles.emojiText}>{getRandomEmoji()}</Text>
      </View>
      <View style={styles.inMessage}>
        {replied && (
          <View style={styles.messageReply}>
            <Text style={styles.reply}>{replied}</Text>
          </View>
        )}
        <Text style={styles.messageContent}>{message}</Text>
        <Text style={styles.messageTime}>{formatDate(time)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inMessage: {
    backgroundColor: "#373E4E",
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 12,
    maxWidth: '80%',
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
});

export default Messages;

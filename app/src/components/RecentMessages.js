import React, { useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import RecentChatsContext from '../contexts/RecentChatsContext'; // Import the context
import Message from './ListRecentMessages';

const RecentMessages = () => {
  const { recentChats } = useContext(RecentChatsContext); // Get recent chats from context

  
  return (
    <View style={styles.container}>
      <FlatList 
        data={recentChats} // Use recentChats from context
        renderItem={({ item }) => <Message item={item} />}
        keyExtractor={(item, index) => index} // Ensure unique keys
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
  },
});

export default RecentMessages;

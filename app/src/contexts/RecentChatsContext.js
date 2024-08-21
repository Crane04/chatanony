import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecentChatsContext = createContext();

export const RecentChatsProvider = ({ children }) => {
  const [recentChats, setRecentChats] = useState([]);

  useEffect(() => {
    const loadRecentChats = async () => {
      try {
        const storedChats = await AsyncStorage.getItem('recentChats');
        if (storedChats) {
          setRecentChats(JSON.parse(storedChats));
        } else {
          setRecentChats([]);
        }
      } catch (error) {
        console.error('Failed to load recent chats from storage:', error);
        setRecentChats([]);
      }
    };

    loadRecentChats();
  }, []);

  const updateRecentChats = (newChat) => {
    if (!Array.isArray(recentChats)) {
      setRecentChats([]);
    }
    
    setRecentChats(prevChats => {
      const updatedChats = [newChat, ...prevChats.filter(chat => chat.id !== newChat.id)];

      
      if (updatedChats.length > 10) updatedChats.pop(); // Limit to 10 recent chats
      
      return updatedChats;
    });
  };

  useEffect(() => {
    const saveRecentChats = async () => {
      try {
        await AsyncStorage.setItem('recentChats', JSON.stringify(recentChats));
      } catch (error) {
        console.error('Failed to save recent chats to storage:', error);
      }
    };

    saveRecentChats();
  }, [recentChats]);

  return (
    <RecentChatsContext.Provider value={{ recentChats, updateRecentChats }}>
      {children}
    </RecentChatsContext.Provider>
  );
};

export default RecentChatsContext;

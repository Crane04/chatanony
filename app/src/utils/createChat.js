import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';

const createChat = async (groupName, selectedImage) => {
  const now = new Date();
  const formData = new FormData();

  formData.append('name', groupName);
  formData.append('created_at', now.toString());

  if (selectedImage) {
    formData.append('image', {
      uri: selectedImage,
      name: 'chat_image.jpg',
      type: 'image/jpeg',
    });
  }

  // try {
    const response = await axios.post(`https://chatanony.pythonanywhere.com/api/create-group`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201) {
      return response.data; // Return the created chat data
    } else {
      console.error('Failed to create chat', response.statusText);
      return null;
    }
  // } catch (error) {
  //   console.error('Error creating chat:', error);
  //   throw error;
  // }
};

export default createChat;

import axios from 'axios';
import { BACKEND_URL } from "../utils/constants";
import generateUniqueId from "./generateId";

const postFormData = async ({ 
  text, 
  setText, 
  replyingTo, 
  setReplyingTo, 
  setMessages, 
  scrollToBottom, 
  group_id, 
  image, 
  setSelectedImage, 
  groupData,
  updateRecentChats, 
}) => {
  const tempId = generateUniqueId(); // Generate a temporary ID for the message
  const currentText = text.trim(); // Trim the text to remove leading and trailing whitespaces
  const currentImage = image;
  const currentReply = replyingTo;
  


  if (!currentText && !currentImage) return;

  // Clear the text and image immediately
  setText("");
  setReplyingTo("");
  if (currentImage) setSelectedImage(null);

  // Create the new message object with the current text and image
  const newMessage = {
    id: tempId,
    message: currentText,
    replied: currentReply,
    time: new Date().toString(),
    image: currentImage ? { uri: currentImage } : null, // Display image preview
  };

  try {
    const formData = new FormData();
    formData.append("time", new Date().toString());
    
    if(currentText) {
      formData.append("message", currentText);
    }
    
    if(currentReply) {
      formData.append("replied", currentReply);
    }

    if (currentImage) {
      formData.append("image", {
        uri: currentImage,
        name: 'uploaded_image.jpg',
        type: 'image/jpeg',
      });
    }

    const response = await axios.post(`${BACKEND_URL}/api/messages/${group_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data) {
      const savedMessage = response.data;

      console.log("DATAAAA", response.data)

      if (savedMessage.image) {
        savedMessage.image = `${BACKEND_URL}${savedMessage.image}`;
      }

      setMessages(prevMessages =>
        prevMessages.map(msg => msg.id === tempId ? savedMessage : msg)
      );
      
      scrollToBottom();
      updateRecentChats({
        id: group_id,
        name: groupData.name,
        last_message: savedMessage.message,
        time: savedMessage.time,
        image: groupData.image
      });

      return response.data
    } else {
      console.error("Failed to send message", response.statusText);
    }
  } catch (error) {
    console.error("Error posting message:", error);
  }
};

export default postFormData;

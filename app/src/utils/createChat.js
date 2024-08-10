import axios from "axios";
import { BACKEND_URL } from "./constants";

const createChat = async (groupName) => {
  const now = new Date();
  try {
    const response = await axios.post(`${BACKEND_URL}/api/create-group`, {
      name: groupName,
      created_at: now.toString()
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data; // Assuming you want the data from the response
  } catch (error) {
    console.error("Error creating chat group:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export default createChat;

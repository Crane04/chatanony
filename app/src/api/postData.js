import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const postData = async (endpoint, data, headers = { "Content-Type": "application/json" }) => {
  try {
    const response = await axios.post(`${BACKEND_URL}${endpoint}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error with POST request:", error);
    throw error;
  }
};

export default postData;

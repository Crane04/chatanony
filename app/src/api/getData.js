import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const getData = async (endpoint, headers = { "Content-Type": "application/json" }) => {
  try {
    const response = await axios.get(`${BACKEND_URL}${endpoint}`, { headers });
    if (!response) return { error: "Error occurred" };
    return response.data;
  } catch (error) {
    console.error("Error with GET request:", error);
    return { error: error.message };
  }
};

export default getData;

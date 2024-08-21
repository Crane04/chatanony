import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const postFormData = async (url, data) => {
  try {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    const response = await axios.post(`${BACKEND_URL}${url}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error posting form data:", error);
    throw error;
  }
};

export default postFormData;

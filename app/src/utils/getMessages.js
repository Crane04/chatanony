import axios from "axios"
import {BACKEND_URL} from "./constants"

const getMessages = async(group_name) => {
    try{
        const response = await axios.get(`${BACKEND_URL}/api/messages/${group_name}`)
        if(!response) return {"error": "error occured"}
        return response.data
    }catch(error){
        return error
    }
}

export default getMessages
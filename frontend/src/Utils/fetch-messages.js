import BACKEND_BASE_URL from "./constants";

const FetchMessagesFunc = (chat_name, setGrpExists, messages, setMessages, setGroupDetails) => {

        const FetchMessages = async() => {
          const response = await fetch (`${BACKEND_BASE_URL}/api/messages/${chat_name}`)
          const result = await response.json()
    
          if(response.status == 404){
            setGrpExists(false)
            return
          }

          setGrpExists(true)
          setGroupDetails(result?.group_data)
          
          setMessages(result?.data)

        }
    
        FetchMessages()


}


export default FetchMessagesFunc

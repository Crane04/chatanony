import { useEffect, useState } from "react"
import Header from "../components/header"
import "../css/create-chat.css"
import CopyToClipBoard from "../Utils/copy-to-clipboard"
import SuccessMessage from "../components/success-message"
import CreateChatForm from "../components/create-chat-form"

const CreateChat = () => {

    const domain = "https://chatanony.netlify.app"

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [group_, setNewGroup] = useState("")

    // This is where the group link will be stored after creation
    const [delivered, setDelivered] = useState("")


        const createNewChat = async(e) => {
            
            e.preventDefault()
            setIsLoading(true)
            const formData = new FormData(e.currentTarget)
            const groupname = formData.get("groupname");            
            const now = new Date();
            const response = await fetch("https://chatanony.pythonanywhere.com/api/create-group",
            // const response = await fetch("http://127.0.0.1:8000/api/create-group",
                {
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            "name": groupname, 
                            "created_at": now.toString()
                        }
                        )
                }
            )

            const returned_resp = await response.json()
            if(response.status === 201){
                setDelivered(`${domain}/chat/${returned_resp.group_id}`)
                
            }else{
                setTimeout(() => {
                    setError(true)
                }, 3000);
            }
            setIsLoading(false)
            setNewGroup("")
        }

  return (
    <div className="container">
        <Header/>
        {  !delivered ?      
            <CreateChatForm createNewChat={createNewChat} group_={group_} setNewGroup={setNewGroup} isLoading={isLoading} error ={error} />
         : 
            <SuccessMessage delivered = {delivered} CopyToClipBoard={CopyToClipBoard}/>
            }
    </div>
  )
}
export default CreateChat
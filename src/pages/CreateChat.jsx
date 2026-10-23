import { useState } from "react"
import Header from "../components/header"
import "../css/create-chat.css"
import CopyToClipBoard from "../Utils/copy-to-clipboard"
import SuccessMessage from "../components/success-message"
import CreateChatForm from "../components/create-chat-form"
import { newRoomKey } from "../Utils/chat-identity"

const CreateChat = () => {

    const [group_, setNewGroup] = useState("")

    // This is where the group link will be stored after creation
    const [delivered, setDelivered] = useState("")

        // Nothing to call: a chatanony room is created the first time someone joins it
        const createNewChat = (e) => {
            e.preventDefault()
            const groupname = group_.trim()
            if (!groupname) return
            setDelivered(`/chat/${newRoomKey()}/${encodeURIComponent(groupname)}`)
            setNewGroup("")
        }

  return (
    <div className="container">
        <Header/>
        {  !delivered ?
            <CreateChatForm createNewChat={createNewChat} group_={group_} setNewGroup={setNewGroup} />
         :
            <SuccessMessage delivered = {delivered} CopyToClipBoard={CopyToClipBoard}/>
            }
    </div>
  )
}
export default CreateChat

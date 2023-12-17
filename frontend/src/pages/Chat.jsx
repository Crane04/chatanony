import { useEffect, useRef } from "react"
import Header from "../components/header"
import "../css/chat-room.css"
import { useState } from "react"
import { useParams } from 'react-router-dom';
import FetchMessagesFunc from "../Utils/fetch-messages";
import PostMessage from "./SendMessage";



const Chat = () => {
  const { chat_name } = useParams()
  const formRef = useRef(null);
  const bottomRef = useRef(null); // To scroll the messages to bottom as page loads
  const [messages, setMessages] = useState([])
  const [grp_exists, setGrpExists ] = useState(false)
  const [group_details, setGroupDetails] = useState("")
  const [page, setPage] = useState(1)

  const faceEmojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌',
    '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎',
    '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😢',
    '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
    '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱',
    '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈',
    '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹',
    '😻', '😼', '😽', '🙀', '😿', '😾',
  ];
  
  

  const FlipPage =() => {
    setPage(page + 1)
  }

useEffect(() => {

  FetchMessagesFunc(chat_name, setGrpExists, setMessages, setGroupDetails, setPage, page)
}, [])

  // Socket
  
  const socket = new WebSocket('ws://127.0.0.1:8000/chat/' + chat_name + "/");
  
  useEffect(() => {
    
    socket.onopen = () => {
      
    };
    
    socket.onmessage = (event) => {
      setMessages(prevMessages => [...prevMessages, JSON.parse(event.data)]);
    };

    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return () => {
      socket.close();
    };
    
  }, [socket]); // Empty dependency array ensures this effect runs once



  return (
    <div className="body">

    
    {
      grp_exists ?

      // Setting differnt styles for chat room header
      <Header chat_name = {group_details?.name} id = "cr-header" />
      :
      <Header />
    }
      

      <div className="new-chat-link">
        <a href="/new">start a new chat &#x1F642;</a>
      </div>

      {
              !grp_exists ?
              <div className="no-message">
                <h1>This group doesn't exist</h1>
                <h3><a href="/new">Create new group</a></h3>
              </div> :

            


        <div className="chat-container">

          <div className="inner-chat">
            {
              messages.length <= 15 || 15 * page >= messages.length ?
              ""
              :
              <div className="older-messages">
              <button onClick={FlipPage}>
              See Older Messages
            </button>
              </div>
            }

            {
              messages.length > 0 ?
              messages.slice(-15 * page).map((message, index)=> {
                const randomFaceEmoji = faceEmojis[Math.floor(Math.random() * faceEmojis.length)];
              return <div className="unit-message" key={index}>
                  <div className="emoji">{randomFaceEmoji}</div>
                  <div className="msg">{message.message}</div>
                </div>
                
                
              }) :
              <div className="no-message">
                <h1>No messages yet</h1>
                <h3>send the first message</h3>
              </div>
              
            }
            <form id="send-message-form" ref={formRef} onSubmit={(e) => {
             e.preventDefault(); PostMessage(e,  socket, formRef, chat_name, setPage)
            }}>
              <input type="text" id="msg-input"placeholder="Type a message..;" name="message"/>
              <button>Send</button>
            </form>
      <div ref={bottomRef} />
          </div>
        </div>
}

    </div>
  )
}
export default Chat
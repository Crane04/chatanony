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
  const [replyingTo, setReplyingTo] = useState("")

  // image uploading





  const Reply = (value) => {
    let value_reply = value.slice(0, 50)
    if(value_reply.length < value.length) {
      setReplyingTo(value_reply + "...")
      return
    }
    setReplyingTo(value_reply)
  }
  const RemoveReply = () => {
    setReplyingTo("")
  }


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

  FetchMessagesFunc(chat_name, setGrpExists, messages, setMessages, setGroupDetails, setPage, page)
}, [])


  // Socket
  
  
  const socket = new WebSocket('ws://127.0.0.1:8000/chat/' + chat_name + "/");
  useEffect(() => {
    console.log(messages);
    socket.onopen = () => {
      console.log("connected");
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
    
  }, [messages]); // Empty dependency array ensures this effect runs once



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

                  <div className="msg">
                  {
                    message.replied ?
                    <div className="msg-reply">{message.replied}</div> :
                    ""
                  }
                    {message.message}
                    </div> 
                    <button onClick={() => {Reply(message.message)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    height="16" width="16" viewBox="0 0 512 512">
                      <path d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 
                      113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 
                      4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 
                      24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z"/>
                    </svg>
                    </button>
                </div>
                
                
              }) :
              <div className="no-message">
                <h1>No messages yet</h1>
                <h3>send the first message</h3>
              </div>
              
            }
            <form id="send-message-form" ref={formRef} onSubmit={(e) => {
             e.preventDefault(); PostMessage(e,  socket, formRef, chat_name, setPage, replyingTo, setReplyingTo, setReplyingTo)
            }}>
              {
                replyingTo ? 
                <div id="reply-msg">
                  <p>{replyingTo}</p>
                  <button onClick={RemoveReply} type="button">x</button>
                </div>
                :
                ""
              }
            <div className="send-message">
              <label htmlFor="img-upload" id="upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="38px" height="37px" viewBox="0 0 512 512">
                  <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7
                   64 64V416c0 35.3-28.7 64-64 64H64c-35.3
                    0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87
                     127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64
                      80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0
                       17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
                </svg>
              </label>
                <input type="file" accept=".png, .jpg, .jpeg" id="img-upload"name="img"/>

              <input type="text" id="msg-input"placeholder="Type a message..;" name="message" autoComplete = "off"/>
              <button>Send</button>
            </div>

            </form>
      <div ref={bottomRef} />
          </div>
        </div>
}

    </div>
  )
}
export default Chat
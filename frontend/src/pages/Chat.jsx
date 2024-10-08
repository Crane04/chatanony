import { useEffect, useRef } from "react"
import Header from "../components/header"
import "../css/chat-room.css"
import { useState } from "react"
import { useParams } from 'react-router-dom';
import FetchMessagesFunc from "../Utils/fetch-messages";
import PostMessage from "../Utils/send-message";
import handleFileChange, { ClearImage } from "../components/uploaded-image";
import Messages from "../components/messages";
import OlderMessagesBtn from "../components/older-messages-btn";
import { Link } from "react-router-dom"
import icons from "../Utils/icons"


const Chat = () => {
  const { chat_name } = useParams()
  const formRef = useRef(null);
  const bottomRef = useRef(null); // To scroll the messages to bottom as page loads
  const inputRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [grp_exists, setGrpExists ] = useState(false)
  const [group_details, setGroupDetails] = useState("")
  const [page, setPage] = useState(1)
  const [replyingTo, setReplyingTo] = useState("")
  const [selectedImage, setSelectedImage] = useState(null); // Image that will be updated is saved here
  const fileInputRef = useRef(null); // will be used to control the state of our image upload
  const [LoadingMessages, setLoadingMessages] = useState(true)



  const Reply = (value) => {
    let value_reply = value.slice(0, 50)
    if(value_reply.length < value.length) {
      setReplyingTo(value_reply + "...")
      return
    }
    setReplyingTo(value_reply)
    inputRef.current.focus()
  }
  const RemoveReply = () => {
    setReplyingTo("")
    inputRef.current.focus()
  }
  
  

  const FlipPage =() => {
    setPage(page + 1)
  }

useEffect(() => {

  FetchMessagesFunc(chat_name, setGrpExists, messages, setMessages, setGroupDetails, setPage, page)
}, [])


  // Socket
  

  const socket = new WebSocket('wss://chatanony-wss.onrender.com/chat/'+ chat_name);
  useEffect(() => {
    socket.onopen = () => {
      setTimeout(() => {
        setLoadingMessages(false);
      }, 400)
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
  grp_exists ? (
    LoadingMessages ? (
      <div id="spinner">
        <div className="spin">
          <div className="spin__">
            {icons.spinner}
          </div>
        </div>
      </div>
    ) : (
      <></>
    )
  ) : (
    <></>
  )
}


    {
      
      grp_exists ?

      // Setting differnt styles for chat room header
      <Header chat_name = {group_details?.name} id = "cr-header" />
      :
      <Header />
    }
      

      <div className="new-chat-link">
        <Link to="/new">start a new chat &#x1F642;</Link>
       
      </div>

      {
              !grp_exists ?
              <div className="no-message">
                <h1>This group doesn't exist</h1>
                <h3><Link to="/new">Create new group</Link></h3>
              </div> :

        <div className="chat-container">

          <div className="inner-chat">
            <OlderMessagesBtn messages = {messages} FlipPage = {FlipPage} page = {page} />
            
            <Messages messages = {messages} page = {page}  Reply = {Reply} />

            <form id="send-message-form" ref={formRef} onSubmit={(e) => {
              e.preventDefault(); 
              PostMessage(e,  socket, formRef, chat_name, setPage, replyingTo, setReplyingTo, setReplyingTo);
              ClearImage(setSelectedImage, fileInputRef)
             
            }}>
              {
                selectedImage?
                  <div className="preview-image">
                  <img src={selectedImage} alt="" />
                  <button onClick={() => {ClearImage(setSelectedImage, fileInputRef)}}>x</button>
                </div>
                :
                ""
              }
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
                <input ref={fileInputRef} type="file" accept=".png, .jpg, .jpeg" id="img-upload"name="img" onChange={(event) => {handleFileChange(event, selectedImage, setSelectedImage)}}/>

              <input type="text" id="msg-input"placeholder="Type a message..;" name="message" autoComplete = "off" ref={inputRef}/>
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
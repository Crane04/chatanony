import { useEffect, useRef } from "react"
import Header from "../components/header"
import "../css/chat-room.css"
import { useState } from "react"
import { useParams } from 'react-router-dom';
import { ChatClient } from "chatanony";
import CHATANONY_KEY from "../Utils/constants";
import { getSenderId } from "../Utils/chat-identity";
import PostMessage from "../Utils/send-message";
import handleFileChange, { ClearImage } from "../components/uploaded-image";
import Messages from "../components/messages";
import OlderMessagesBtn from "../components/older-messages-btn";
import { Link } from "react-router-dom"
import icons from "../Utils/icons"

// Adds messages that aren't already shown and keeps everything in time order
const mergeMessages = (current, incoming) => {
  const seen = new Set(current.map((m) => m.id))
  const fresh = incoming.filter((m) => !seen.has(m.id))
  if (fresh.length === 0) return current
  return [...current, ...fresh].sort((a, b) => a.timestamp.localeCompare(b.timestamp))
}

const Chat = () => {
  const { chat_name, group_name } = useParams()
  const formRef = useRef(null);
  const bottomRef = useRef(null); // To scroll the messages to bottom as new ones arrive
  const inputRef = useRef(null)
  const chatRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [hasOlder, setHasOlder] = useState(false)
  const [loadingOlder, setLoadingOlder] = useState(false)
  const [replyingTo, setReplyingTo] = useState("")
  const [selectedImage, setSelectedImage] = useState(null); // Image that will be updated is saved here
  const fileInputRef = useRef(null); // will be used to control the state of our image upload
  const [LoadingMessages, setLoadingMessages] = useState(true)
  const [connectError, setConnectError] = useState("")
  const [sendError, setSendError] = useState("")

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

  // Connect, join the room and load recent history
  useEffect(() => {
    if (!CHATANONY_KEY) {
      setConnectError("Missing VITE_CHATANONY_KEY. Add it to frontend/.env.local.")
      setLoadingMessages(false)
      return
    }

    const chat = new ChatClient({ apiKey: CHATANONY_KEY })
    chatRef.current = chat
    setMessages([])
    setLoadingMessages(true)

    const unsubscribe = chat.onMessage((msg) => {
      setMessages((prev) => mergeMessages(prev, [msg]))
    })

    chat.joinRoom(chat_name, getSenderId())
      .then(() => chat.getHistory())
      .then(({ messages: history, hasMore }) => {
        setMessages((prev) => mergeMessages(prev, history))
        setHasOlder(hasMore)
      })
      .catch((err) => setConnectError(err.message))
      .finally(() => setTimeout(() => setLoadingMessages(false), 400))

    return () => {
      unsubscribe()
      chat.disconnect()
    }
  }, [chat_name])

  const LoadOlder = async () => {
    if (messages.length === 0) return
    setLoadingOlder(true)
    try {
      const { messages: older, hasMore } = await chatRef.current.getHistory({ before: messages[0].id })
      setMessages((prev) => mergeMessages(prev, older))
      setHasOlder(hasMore)
    } catch (err) {
      setSendError(err.message)
    } finally {
      setLoadingOlder(false)
    }
  }

  // Scroll down when a new message arrives at the bottom, not when older ones load above
  const lastId = messages.length ? messages[messages.length - 1].id : null
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lastId])

  return (
    <div className="body">
{
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
}

      <Header chat_name = {group_name} id = "cr-header" />

      <div className="new-chat-link">
        <Link to="/new">start a new chat &#x1F642;</Link>

      </div>

      {
              connectError ?
              <div className="no-message">
                <h1>Couldn't connect to this chat</h1>
                <h3>{connectError}</h3>
              </div> :

        <div className="chat-container">

          <div className="inner-chat">
            <OlderMessagesBtn hasOlder = {hasOlder} loading = {loadingOlder} LoadOlder = {LoadOlder} />

            <Messages messages = {messages} Reply = {Reply} />

            <form id="send-message-form" ref={formRef} onSubmit={(e) => {
              e.preventDefault();
              PostMessage(e, chatRef.current, formRef, replyingTo, setReplyingTo, setSendError);
              ClearImage(setSelectedImage, fileInputRef)

            }}>
              {
                sendError ?
                <div id="reply-msg">
                  <p>{sendError}</p>
                  <button onClick={() => setSendError("")} type="button">x</button>
                </div>
                :
                ""
              }
              {
                selectedImage?
                  <div className="preview-image">
                  <img src={selectedImage} alt="" />
                  <button type="button" onClick={() => {ClearImage(setSelectedImage, fileInputRef)}}>x</button>
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

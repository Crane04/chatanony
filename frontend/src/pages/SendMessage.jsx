const PostMessage = (e,  socket, formRef, chat_name, setPage, replyingTo, setReplyingTo) => {
  e.preventDefault()
  let message = e.target.message.value
  if (!message) return;

  socket.send(JSON.stringify({
      "message": message,
      "replied": replyingTo
  }))
  
  formRef.current.reset();

  const SendMsg = async(e) => {
            
    // e.preventDefault()         
    const now = new Date();
    const response = await fetch("http://127.0.0.1:8000/api/messages/" + chat_name,
        {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "message": message, 
                    "time": now.toString(),
                    "replied": replyingTo
                }
                )

        }
    )
    setReplyingTo("")
  }
  SendMsg()
  
//   setPage(1)
}

export default PostMessage
const PostMessage = (e,  socket, formRef, chat_name, setPage, replyingTo, setReplyingTo) => {
  e.preventDefault()
  let message = e.target.message.value
  let file = e.target.img.files[0];
  if (!message &&  !file) return;

  console.log(message);

  socket.send(JSON.stringify({
      "message": message,
      "replied": replyingTo
  }))
  
  formRef.current.reset();

  const SendMsg = async(e) => {
            
    const now = new Date();

    const formData = new FormData()
    if(file !== undefined){
        formData.append('image', file);
        console.log(file);
    }
    formData.append("time", now.toString())
    formData.append("message", message)

    const response = await fetch("http://127.0.0.1:8000/api/messages/" + chat_name,
        {
            method:"POST",
            body: formData

        }
    )
    setReplyingTo("")
  }
  SendMsg()
  
//   setPage(1)
}

export default PostMessage
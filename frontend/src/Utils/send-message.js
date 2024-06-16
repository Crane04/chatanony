import EncodeImage from "./encode-image";
import BACKEND_BASE_URL from "./constants";
const PostMessage = async (e, socket, formRef, chat_name, setPage, replyingTo, setReplyingTo) => {
  e.preventDefault();
  let message = e.target.message.value;
  let file = e.target.img.files[0];
  if (!message && !file) return;

  try {
    let imgData = null;
    if (file) {
      imgData = await EncodeImage(file);
    }



    socket.send(
      JSON.stringify({
        message: message,
        replied: replyingTo,
        image: imgData,
      })
    );

    formRef.current.reset();

    const now = new Date();
    const formData = new FormData();
    if (file !== undefined) {
      formData.append("image", file);
    }
    formData.append("time", now.toString());
    formData.append("message", message);
    formData.append("replied", replyingTo);

    const response = await fetch(
      `${BACKEND_BASE_URL}/api/messages/${chat_name}`,
      {
        method: "POST",
        body: formData,
      }
    );
    setReplyingTo("");
  } catch (error) {
    console.error("Error posting message:", error);
  }

  // setPage(1); // You might uncomment this if needed
};

export default PostMessage;

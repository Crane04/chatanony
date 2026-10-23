import EncodeImage from "./encode-image";

const PostMessage = async (e, chat, formRef, replyingTo, setReplyingTo, setSendError) => {
  e.preventDefault();
  const message = e.target.message.value.trim();
  const file = e.target.img.files[0];
  if (!message && !file) return;

  setSendError("");
  try {
    // Only include fields that have a value; the project schema makes all three optional
    const payload = {};
    if (message) payload.message = message;
    if (file) payload.image = await EncodeImage(file);
    if (replyingTo) payload.replied = replyingTo;

    // The sent message comes back through onMessage, which is what renders it
    await chat.sendMessage(payload);
    formRef.current.reset();
    setReplyingTo("");
  } catch (error) {
    console.error("Error posting message:", error);
    setSendError(error.message);
  }
};

export default PostMessage;

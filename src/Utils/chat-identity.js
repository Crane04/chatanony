// Anonymous per-browser id, so chatanony can tell senders apart without any account
const SENDER_KEY = "chatanony_sender_id"

export const getSenderId = () => {
  let id = localStorage.getItem(SENDER_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(SENDER_KEY, id)
  }
  return id
}

// Room keys work like passwords (anyone who has one can join), so make them unguessable
export const newRoomKey = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(12))
  return Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join("")
}

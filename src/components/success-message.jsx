import { Link } from "react-router-dom"


// `delivered` is the room's path; the shareable link uses whatever domain the app runs on
const SuccessMessage = ({delivered, CopyToClipBoard}) => {
  const link = `${window.location.origin}${delivered}`
  return (
    <div className="form created">
    <h1>Yippee 🎉💃🎉💃🎉!!!</h1>
    <span>You've sucessfully created a new anonymous group chat!</span>
    <div className="config">

        <div className="link d"> {link} </div>
        <div className="link btn" onClick={() => {CopyToClipBoard(link)}}>Copy Link</div>
    </div>
    <Link to= {delivered} >Go to chat room</Link>
    <a href="/new">Create new group</a>
</div>
  )
}
export default SuccessMessage
import { Link } from "react-router-dom"


const SuccessMessage = ({delivered, CopyToClipBoard}) => {
  return (
    <div className="form created">
    <h1>Yippee 🎉💃🎉💃🎉!!!</h1>
    <span>You've sucessfully created a new anonymous group chat!</span>
    <div className="config">

        <div className="link d"> {delivered} </div>
        <div className="link btn" onClick={() => {CopyToClipBoard(delivered)}}>Copy Link</div>
    </div>
    <Link to= {delivered} >Go to chat room</Link>
    <a href="/new">Create new group</a>
</div>
  )
}
export default SuccessMessage
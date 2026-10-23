const CreateChatForm = ({createNewChat, group_, setNewGroup}) => {
  return (
    <div className="form">

        <h1>New Group</h1>
        <form method="post" onSubmit={createNewChat}>
            <label htmlFor="groupname">Name:</label>
            <input type="text" value = {group_} onChange={(e) => {setNewGroup(e.target.value)}} id="groupname" name="groupname" placeholder="E.g Hangout with Crane"  required/>
            <button>Create Group</button>
        </form>

    </div>
  )
}
export default CreateChatForm

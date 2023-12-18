const CreateChatForm = ({createNewChat, group_, setNewGroup, isLoading, error}) => {
  return (
    <div className="form">
            
        <h1>New Group</h1>
        <form method="post" onSubmit={createNewChat}>
            <label htmlFor="groupname">Name:</label>
            <input type="text" value = {group_} onChange={(e) => {setNewGroup(e.target.value)}} id="groupname" name="groupname" placeholder="E.g Hangout with Crane"  required/>
            {
              isLoading ? 
              <button disabled = {isLoading} style={{background:"grey"}}>Create Group</button>
              :
              <button disabled = {isLoading} >Create Group</button>
            }
            
        </form>
        {error ? <div>An error occured, please try again!</div>:  ""}
                
    </div>
  )
}
export default CreateChatForm
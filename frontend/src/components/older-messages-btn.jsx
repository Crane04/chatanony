const OlderMessagesBtn = ({messages, FlipPage, page}) => {
  return (
    
        messages.length <= 15 || 15 * page >= messages.length ?
        ""
        :
        <div className="older-messages">
            <button onClick={FlipPage}>
                See Older Messages
            </button>
        </div>
      
  )
}
export default OlderMessagesBtn
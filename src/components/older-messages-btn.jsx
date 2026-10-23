const OlderMessagesBtn = ({hasOlder, loading, LoadOlder}) => {
  return (

        !hasOlder ?
        ""
        :
        <div className="older-messages">
            <button onClick={LoadOlder} disabled={loading}>
                {loading ? "Loading..." : "See Older Messages"}
            </button>
        </div>

  )
}
export default OlderMessagesBtn

import { Link } from "react-router-dom"

import "../css/header.css"

const Header = ({chat_name, id}) => {
  return (
    <div className="arc-container" id={id} >
        <div className="arc"></div>
        <div className="brand-name">
          <Link to="/">chatanony</Link>
          {
            chat_name ? <p>{chat_name}</p> : ""
          }
          </div>
  </div>
  )
}
export default Header
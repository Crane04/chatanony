import Header from "../components/header"
import "../css/home.css"
import img_snip from "../assets/chat_interface_-_3.png"


const Home = () => {
  return (
    <>
    <div className="container">
        <Header/>

            <div className="inner home">
                <main>
                    <div>
                        <h1><span>Chat</span> <span>Anonymously</span></h1>
                        <p>No account required.</p>
                    </div>
                    <div className="btns">
                        <span id="start"><a href="/new">Start a chat</a></span>
                        <span id="learn"><a href="#learn-more">Learn more</a></span>
                    </div>
                </main>
                <aside>
                        <img src={img_snip} alt=""/>
                </aside>
            </div>
    </div>        
        <div className="inner" id="learn-more">
        <h1>
            <span>
                What's The Deal?
            </span>
            <p>
                We've built an open source, anonymous conversation platform.
            </p>
        </h1>

        <ul>
            <li>
                <h3>No User Accounts</h3>
                <p>We don't require you to sign up with Facebook, Twitter or an email Address</p>
            </li>
            <li>
                <h3>No Tracking</h3>
                <p>We don't use cookies or other scripts that track and identify users, so you stay private</p>
            </li>
            <li>
                <h3>Open Sourced</h3>
                <p>We've open sourced our code to the world. Mo tricks or backdoors up our sleeves.</p>
            </li>
            
            <li>
                <h3>Emojis</h3>
                <p>To keep messages anonymous, each one is assigned a random emoji</p>
            </li>
            <li>
                <h3>Delighful Surprises</h3>
                <p>Find secret conversations, plan a surprise party</p>
            </li>
        </ul>
    </div>

    </>
  )
}
export default Home
import Header from "../components/header"
import "../css/home.css"
import img_snip from "../assets/chat_interface_-_3.png"
import learnMore from "../Utils/learn-more"


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
            {
                learnMore.map((learn, index) => {
                    const {title, exp} = learn
                return  <li key={index}>
                                <h3>{title}</h3>
                                <p>{exp}</p>
                            </li>
                })
            }
        </ul>
    </div>

    </>
  )
}
export default Home
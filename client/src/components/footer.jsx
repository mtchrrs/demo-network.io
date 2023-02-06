import React from 'react'
import '../styles/footer.css'
import logo from '../assets/networkio-logo.png'
// import Twitter from "../assets/twitter-logo.png";
// import Linkedin from "../assets/linkedin-logo.png";
// import Instagram from "../assets/instagram-logo.png";

function Footer () {
  return (
        <div className="footer">
            <img src={logo} className="img-footer" alt="Network.io Example" />
        </div>
  )
}

export default Footer

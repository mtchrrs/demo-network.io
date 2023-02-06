import React from 'react'
import '../styles/landing.css'
import landingImage from '../assets/landing-img.png'

function Landing () {
  return (
    <div className="landing">
      <div className="oval-shape">
        <div className="img-cont">
          <img src={landingImage} className="img" alt="Network.io Example" />
        </div>
        <div className="text-box">
          <h1 className="h1-land">
          Connect with people, businesses and opportunities
        </h1>
        <p className="p-landing">The networking system that allows you to connect with others using your portfolio, share your socials, advertise what opportunities you are looking for, and services you provide, all through a QR code</p>
        </div>

      </div>
    </div>
  )
}

export default Landing

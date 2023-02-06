import React from 'react'
import '../styles/profile.css'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_ME } from '../utils/queries'
import Auth from '../utils/auth'
import Logo from '../assets/networkio-logo.png'

const Profile = () => {
  const { username: userParam } = useParams()

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  })

  const user = data?.me || data?.user || {}
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.email === userParam) {
    return <Navigate to="/profile" />
  }

  if (loading) {
    return <div>Loading...</div>
  }

  // if (!user?.email) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <div className="profile">
      <div className="prof-content">
        <div className="main-profile">
          <img
            src={user.profileImg}
            className="user-img"
            alt="User Profile Image"
          />
          {/* <h1 className="user-name">{`${user.displayName}`}</h1> */}
          <h1 className="user-name">Mitchell Harris</h1>
          {/* <p className="user-description">{`${user.description}`}</p> */}
          <p className="user-description">This is a very brief professional description of what it is that I am trying to gain by using this app</p>
        </div>

        <div className="user-links">
          <div className="user-portfolio">
            <a href={user.portfolioLink}>My Portfolio</a>
          </div>
          <div className="user-opportunities">
            <a href={user.opportunitiesLink}>Opportunities to Connect</a>
          </div>
          <div className="user-socials">
            <a className="indv-link" href={user.linkedin}>Linkedin</a>
            <a className="indv-link" href={user.instagram}>Instagram</a>
            <a className="indv-link" href={user.facebook}>Facebook</a>
            <a className="indv-link" href={user.twitter}>Twitter</a>
          </div>
        </div>

        <div className="our-logo">
          <Link to={`${process.env.PUBLIC_URL}/`}><img src={Logo} className="the-logo" alt="Network.io Logo" /></Link>
        </div>
      </div>
    </div>
  )
}

export default Profile

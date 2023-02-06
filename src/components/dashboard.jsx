import React from 'react'
import '../styles/dashboard.css'
import { Navigate, useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Profile from './profile'
import Opportunities from './opportunities'
import OpportunitiesBuild from './buildop'
import Portfolio from './portfolio'
import PortfolioBuild from './buildportfolio'
import ProfileEdit from './profileEdit'

import Auth from '../utils/auth'

import { QUERY_USER, QUERY_ME } from '../utils/queries'

function Dashboard () {
  const { username: userParam } = useParams()
  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  })

  const user = data?.me || data?.user || {}

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.email === userParam) {
    return <Navigate to="/dashboard" />
  }

  //   const copyFunction = () => {
  //     // e.preventDefault()
  //     const link = document.getElementsByClassName('dash-copy-text')[0]
  //     const text = link.value()
  //     navigator.clipboard.writeText(text).then(() => {
  //       alert('Link copied to clipboard')
  //     })
  //   }

  return (
        <div className="main-cont-dash">
            <div className="dash-content">
                <h1 className="dash-title">Welcome back, {`${user.fullName}`}</h1>
                <div className="dash-links">
                    <div className="dash-profile">
                        <h2 className="dash-prof-text">Profile</h2>
                        <Link className="dash-indv-links" to={`${process.env.PUBLIC_URL}/profile`} element={<Profile />}>See</Link>
                        <Link className="dash-indv-links" to={`${process.env.PUBLIC_URL}/profile-edit`} element={<ProfileEdit />}>Edit</Link>
                    </div>
                    <div className="dash-portfolio">
                        <h2 className="dash-port-text">Portfolio</h2>
                        <Link className="dash-indv-links" to={`${process.env.PUBLIC_URL}/portfolio`} element={<Portfolio />}>See</Link>
                        <Link className="dash-indv-links" to={`${process.env.PUBLIC_URL}/portfolio-build`} element={<PortfolioBuild />}>Edit</Link>
                    </div>
                    <div className="dash-opportunities">
                        <h2 className="dash-opp-text">Opportunities</h2>
                        <Link className="dash-indv-links" to={`${process.env.PUBLIC_URL}/opportunities`} element={<Opportunities />}>See</Link>
                        <Link className="dash-indv-links" to={`${process.env.PUBLIC_URL}/opportunities-build`} element={<OpportunitiesBuild />}>Edit</Link>
                    </div>
                    <div className="copy-link">
                        <input className="dash-copy-text" type="text" value={`${user.portfolio}`}></input>
                        <button className="copy-btn" onClick={''}>Copy Link</button>
                        {/* <button className="copy-btn" onClick={copyFunction()}>Copy Link</button> */}
                    </div>
                </div>
            </div>

        </div>
  )
}

export default Dashboard

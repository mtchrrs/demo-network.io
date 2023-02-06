import React from 'react'
import '../styles/opportunities.css'
import { Navigate, useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_ME } from '../utils/queries'

import Auth from '../utils/auth'
import Profile from './profile'

function Opportunities () {
  const { username: userParam } = useParams()
  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  })

  const user = data?.me || data?.user || {}

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.email === userParam) {
    return <Navigate to="/opportunities-edit" />
  }

  return (
        <div className="main-cont-opp">
            <div className="opp-holder">
                <div className="opp-block">
                    <h1 className="text-opp">Web Development</h1>
                    <p className="description-opp">I would love to join you and work on a project. I am a full stack web developer looking to test my skills!</p>
                </div>
                <div className="opp-block">
                    <h1 className="text-opp">Web Development</h1>
                    <p className="description-opp">I would love to join you and work on a project. I am a full stack web developer looking to test my skills!</p>
                </div>
                <div className="opp-block">
                    <h1 className="text-opp">Web Development</h1>
                    <p className="description-opp">I would love to join you and work on a project. I am a full stack web developer looking to test my skills!</p>
                </div>
                <btn className="back-btn"><Link to={`${process.env.PUBLIC_URL}/profile`} element={<Profile />}>Back</Link></btn>
            </div>
        </div>
  )
}

export default Opportunities

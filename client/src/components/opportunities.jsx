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
                    <h1 className="text-opp">{`${user.oppOneTitle}`}</h1>
                    <p className="description-opp">{`${user.oppOneDescr}`}</p>
                </div>
                <div className="opp-block">
                    <h1 className="text-opp">{`${user.oppTwoTitle}`}</h1>
                    <p className="description-opp">{`${user.oppTwoDescr}`}</p>
                </div>
                <div className="opp-block">
                    <h1 className="text-opp">{`${user.oppThreeTitle}`}</h1>
                    <p className="description-opp">{`${user.oppThreeDescr}`}</p>
                </div>
                <btn className="back-btn"><Link to={`${process.env.PUBLIC_URL}/profile`} element={<Profile />}>Back</Link></btn>
            </div>
        </div>
  )
}

export default Opportunities

import React from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import Auth from '../utils/auth'
import { QUERY_USER, QUERY_ME } from '../utils/queries'
import '../styles/opportunities.css'
import Profile from './profile'

const Portfolio = () => {
  const { username: userParam } = useParams()
  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  })
  const user = data?.me || data?.user || {}

  if (Auth.loggedIn() && Auth.getProfile().data.email === userParam) {
    return <Navigate to="/portfolio-edit" />
  }

  return (
        <div className="main-cont-port">
            <div className="main-show">
                <div className="opp-block">
                    <h1 className="education">Education</h1>
                    <h1 className="text">edTwoTitle{user.edOneTitle}</h1>
                    <p className="description">edTwoDescr{user.edOneDescr}</p>
                    <h1 className="text">edTwoTitle{user.edTwoTitle}</h1>
                    <p className="description">edTwoDescr{user.edTwoDescr}</p>
                </div>
                <div className="opp-block">
                    <h1 className="experience">Experience</h1>
                    <h1 className="text">exOneTitle{user.exOneTitle}</h1>
                    <p className="description">exOneDescr{user.exOneDescr}</p>
                    <h1 className="text">exOneTitle{user.exTwoTitle}</h1>
                    <p className="description">exOneDescr{user.exTwoDescr}</p>
                </div>
                <div className="opp-block">
                    <h1 className="skills">Skills</h1>
                    <h1 className="text">skill 1{user.skillOne}</h1>
                    <h1 className="text">skill 2{user.skillTwo}</h1>
                    <h1 className="text last-skill">skill 3{user.skillThree}</h1>
                </div>
                <btn className="back-btn"><Link to={`${process.env.PUBLIC_URL}/profile`} element={<Profile />}>Back</Link></btn>
            </div>

        </div>
  )
}

export default Portfolio

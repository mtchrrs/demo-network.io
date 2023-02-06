import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import { useQuery, useMutation } from '@apollo/client'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth'
import Profile from './profile'

// import { QUERY_USER, QUERY_ME } from '../utils/queries'
import { ADD_OPP } from '../utils/mutations'

import '../styles/portfolio.css'

const PortfolioBuild = () => {
  const { username: userParam } = useParams()
  // const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam }
  // })

  // const user = data?.me || data?.user || {}

  if (Auth.loggedIn() && Auth.getProfile().data.email === userParam) {
    return <Link to="/portfolio" />
  }

  const [formState, setFormState] = useState({
    edOneTitle: '',
    edOneDescr: '',
    edTwoTitle: '',
    edTwoDescr: '',
    exOneTitle: '',
    exOneDescr: '',
    exTwoTitle: '',
    exTwoDescr: '',
    skillOne: '',
    skillTwo: '',
    skillThree: ''
  })

  const [addOpportunities, { error, info }] = useMutation(ADD_OPP)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)

    try {
      const { info } = await addOpportunities({
        variables: { ...formState }
      })

      Auth.login(info.addOpportunites.token)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="form-cont-port">

      {info ? (
        <p>
           <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <form className="form" onSubmit={handleFormSubmit}>

          {/* Education section */}
            <h1 className="Education subtitle">Education</h1>
          <input
            className="form-input ed-inp"
            placeholder="Education one title"
            name="edOneTitle"
            type="text"
            value={formState.edOneTitle}
            onChange={handleChange}
          />
          <input
            className="form-input ed-inp"
            placeholder="Education one description"
            name="edOneDescr"
            type="text"
            value={formState.edOneDescr}
            onChange={handleChange}
          />
          <br></br>
          <br></br>
          <input
            className="form-input ed-inp"
            placeholder="Education two title"
            name="edTwoTitle"
            type="text"
            value={formState.edTwoTitle}
            onChange={handleChange}
          />
          <input
            className="form-input ed-inp"
            placeholder="Education two description"
            name="edTwoDescr"
            type="text"
            value={formState.edTwoDescr}
            onChange={handleChange}
          />

          {/* experience section */}
            <h1 className="Experience subtitle">Experience</h1>
            <input
            className="form-input ex-inp"
            placeholder="Experience one title"
            name="exOneTitle"
            type="text"
            value={formState.exOneTitle}
            onChange={handleChange}
          />
          <input
            className="form-input ex-inp"
            placeholder="Experience one description"
            name="exOneDescr"
            type="text"
            value={formState.exOneDescr}
            onChange={handleChange}
          />
          <br></br>
          <br></br>
            <input
                className="form-input ex-inp"
                placeholder="Experience two title"
                name="exTwoTitle"
                type="text"
                value={formState.exTwoTitle}
                onChange={handleChange}
            />
          <input
            className="form-input ex-inp"
            placeholder="Experience two description"
            name="exTwoDescr"
            type="text"
            value={formState.exTwoDescr}
            onChange={handleChange}
          />

            <h1 className="Skills subtitle">Skills</h1>
          <input
            className="form-input sk-inp"
            placeholder="Skill 1"
            name="skillOne"
            type="text"
            value={formState.skillOne}
            onChange={handleChange}
          />
          <input
            className="form-input sk-inp"
            placeholder="Skill 2"
            name="skillTwo"
            type="text"
            value={formState.skillTwo}
            onChange={handleChange}
          />
          <input
            className="form-input sk-inp"
            placeholder="Skill 3"
            name="skillThree"
            type="text"
            value={formState.skillThree}
            onChange={handleChange}
          />
          <button
            className="submit-btn"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
           <Link to={`${process.env.PUBLIC_URL}/profile`} element={<Profile />}>Submit</Link>
          </button>
        </form>
      )}

      {error && <div className="error-message">{error.message}</div>}
    </div>
  )
}

export default PortfolioBuild

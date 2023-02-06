import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/signup.css'
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../utils/mutations.js'

import UploadBtn from '../components/uploadbtn'
import Auth from '../utils/auth'
import Dashboard from './dashboard'

const SignUp = () => {
  const [formState, setFormState] = useState({
    displayName: '',
    email: '',
    password: '',
    profileImg: '',
    description: '',
    portfolioLink: '',
    opportunitiesLink: '',
    linkedin: '',
    instagram: '',
    facebook: '',
    twitter: ''
  })
  const [addUser, { error, data }] = useMutation(ADD_USER)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)

    try {
      const { data } = await addUser({
        variables: { ...formState }
      })

      Auth.login(data.addUser.token)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="signup">
      <div className="form-su">
        <h4 className="title">Sign Up</h4>
        {data
          ? (
          <p>
            Success! You may now head to the description-opp
          </p>
            )
          : (
          <form onSubmit={handleFormSubmit}>
            <input
              className="form-input name top-row"
              placeholder="Your full name"
              name="displayName"
              type="text"
              value={formState.name}
              onChange={handleChange}
            />
            <input
              className="form-input email top-row"
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              className="form-input pword top-row"
              placeholder="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />

            <div className="mid-row">
              <div className="img-div">
                <p className="upload-text">Upload your profile image</p>
                <UploadBtn value="profileImg"/>
              </div>

              <p className="portfolio-link">
                <Link to={`${process.env.PUBLIC_URL}/portfolio-build`}>Click here to create your portfolio</Link>
              </p>
              <p className="opportunities-link">
                <Link to={`${process.env.PUBLIC_URL}/opportunities-build`}>Click here to create your opportunities page</Link>
              </p>
            </div>

            <input
              className="form-input third-row bio"
              placeholder="Your bio"
              name="description"
              type="text"
              value={formState.description}
              onChange={handleChange}
            />
            <input
              className="form-input third-row social-links"
              placeholder="linkedin URL"
              name="linkedin"
              type="text"
              value={formState.linkedin}
              onChange={handleChange}
            />
            <input
              className="form-input third-row social-links"
              placeholder="instagram URL"
              name="instagram"
              type="text"
              value={formState.instagram}
              onChange={handleChange}
            />
            <input
              className="form-input third-row social-links"
              placeholder="facebook URL"
              name="facebook"
              type="text"
              value={formState.facebook}
              onChange={handleChange}
            />
            <input
              className="form-input third-row social-links"
              placeholder="twitter URL"
              name="twitter"
              type="text"
              value={formState.twitter}
              onChange={handleChange}
            />
            <button
              className="submit-btn-opp"
              style={{ cursor: 'pointer' }}
              // type="submit"
          >
            
            <Link to={`${process.env.PUBLIC_URL}/dashboard`} element={<Dashboard />}>Submit</Link>
            </button>
          </form>
            )}

        {error && <div className="error-message">{error.message}</div>}
      </div>
    </div>
  )
}

export default SignUp

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/signup.css'

import UploadBtn from '../components/uploadbtn'
import Auth from '../utils/auth'

// const [user, { error, data }] = ''
const error = ''
const user = Auth.loggedIn()

const ProfileEdit = () => {
  const [formState, setFormState] = useState({
    displayName: '',
    email: '',
    password: '',
    description: '',
    portfolioLink: '',
    opportunitiesLink: '',
    linkedin: '',
    instagram: '',
    facebook: '',
    twitter: ''
  })

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
      const { data } = await user({
        variables: { ...formState }
      })

      Auth.loggedIn(data.user.token)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="signup">
      <div className="form-su">
        <h4 className="title">Update your profile</h4>
        <form onSubmit={handleFormSubmit}>
          <div className="mid-row">
            <div className="img-div">
              <p className="upload-text">Upload your profile image</p>
              <UploadBtn />
            </div>

            <p className="portfolio-link">
              <Link to={`${process.env.PUBLIC_URL}/portfolio-build`}>
                Click here to edit your portfolio
              </Link>
            </p>
            <p className="opportunities-link">
              <Link to={`${process.env.PUBLIC_URL}/opportunities-build`}>
                Click here to edit your opportunities page
              </Link>
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
            className="submit-btn"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Submit
          </button>
        </form>
        {error && <div className="error-message">{error.message}</div>}
      </div>
    </div>
  )
}

export default ProfileEdit

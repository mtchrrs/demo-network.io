import '../styles/login.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'
import Dashboard from './dashboard'

import Auth from '../utils/auth'

const LogIn = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error, data }] = useMutation(LOGIN_USER)

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value
    })
  }

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)
    try {
      const { data } = await login({
        variables: { ...formState }
      })

      Auth.login(data.login.token)
    } catch (e) {
      console.error(e)
    }

    // clear form values
    setFormState({
      email: '',
      password: ''
    })
  }

  return (
    <div className="login">

      <div className="login-form">
        <h4 className="login-title">Login</h4>
        {data
          ? (
          <p>
            Success! You may now head to the <Link to={`${process.env.PUBLIC_URL}/dashboard`} element={<Dashboard />}>dashboard page</Link>
          </p>
            )
          : (
          <form onSubmit={handleFormSubmit}>
            <div className="log-top">
              <input
              className="form-input log-input"
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            </div>

            <div className="log-mid">
              <input
              className="form-input log-input"
              placeholder="Your Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            </div>

            <button
              className="btn"
              style={{ cursor: 'pointer' }}
              type="submit"
            >
              Submit
            </button>
          </form>
            )}

        {error && <div className="error-form">{error.message}</div>}
      </div>
    </div>
  )
}

export default LogIn

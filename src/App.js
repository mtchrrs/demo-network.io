import './App.css'
import React from 'react'
import Header from './components/header'
import Landing from './components/landing'
import Footer from './components/footer'
import SignUp from './components/signup'
import LogIn from './components/login'
import Profile from './components/profile'
import Opportunities from './components/opportunities'
import OpportunitiesBuild from './components/buildop'
import Portfolio from './components/portfolio'
import PortfolioBuild from './components/buildportfolio'
import Dashboard from './components/dashboard.jsx'
import ProfileEdit from './components/profileEdit'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: '/graphql'
})

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App () {
  return (
    <ApolloProvider client={client}>
    <Router class="App">
        <Header />
        <Routes>
          <Route exact path={`${process.env.PUBLIC_URL}/`} element={ <Landing /> }/>
          <Route exact path={`${process.env.PUBLIC_URL}/signup`} element={ <SignUp /> }/>
          <Route exact path={`${process.env.PUBLIC_URL}/login`} element={ <LogIn /> }/>
          <Route exact path={`${process.env.PUBLIC_URL}/dashboard`} element={ <Dashboard /> }/>
          <Route exact path={`${process.env.PUBLIC_URL}/profile`} element={ <Profile /> }/>
          <Route exact path={`${process.env.PUBLIC_URL}/opportunities`} element={ <Opportunities /> }/>
          <Route exact path={`${process.env.PUBLIC_URL}/opportunities-build`} element={ <OpportunitiesBuild /> }/>
          <Route exact path={`${process.env.PUBLIC_URL}/portfolio`} element={ <Portfolio /> }/>
          <Route exact path={`${process.env.PUBLIC_URL}/portfolio-build`} element={ <PortfolioBuild /> }/>
          <Route exact path={`${process.env.PUBLIC_URL}/profile-edit`} element={ <ProfileEdit /> }/>
        </Routes>
        <Footer />
    </Router>
    </ApolloProvider>
  )
}

export default App

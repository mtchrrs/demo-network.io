import { gql } from '@apollo/client'

export const QUERY_USER = gql`
  query user($displayName: String!) {
    user(displayName: $displayName) {
      _id
      email
    }
  }
`

// export const QUERY_USER = gql`
//   query user($displayName: String!) {
//     user(username: $username) {
//       _id
//       displayName
//       email
//       description
//       portfolioLink
//       opportunitiesLink
//       linkedin
//       instagram
//       facebook
//       twitter
//       oppOneTitle
//       oppOneDescr
//       oppTwoTitle
//       oppTwoDescr
//       oppThreeTitle
//       oppThreeDescr
//     }
//   }
// `

export const QUERY_ME = gql`
  query me {
    me {
      _id
      displayName
      email
      description
      portfolioLink
      opportunitiesLink
      linkedin
      instagram
      facebook
      twitter
    }
  }
`

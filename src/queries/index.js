import {gql} from '@apollo/client';

export const USER = gql`query User($username: String!){
  user(username: $username) {
    id
    username
    email
  }
}`

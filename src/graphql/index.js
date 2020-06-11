import {gql} from '@apollo/client';

export const USER = gql`
  query User($username: String!){
    user(username: $username) {
      id
      username
      email
    }
  }
`;

export const CREATEDOCUMENT = gql`
  mutation CreateDocument($documentInput: DocumentInput!){
    createDocument(input: $documentInput) {
      title
      description
      file
    }
  }
`;

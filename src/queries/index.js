import {gql} from '@apollo/client';

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!){
    login(input: $loginInput) 
  }
`;

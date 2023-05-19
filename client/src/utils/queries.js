import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      savedWords {
        _id: ID
        original_text: String!
        es: String!
      }
    }
  }
`;

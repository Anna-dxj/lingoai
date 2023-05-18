import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      savedWords {
        _id: ID
        wordID: String!
        l1_text: String!
        l2_text: String!
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedWords {
        _id: ID
        original_text: String!
        en: String!
      }
    }
  }
`;

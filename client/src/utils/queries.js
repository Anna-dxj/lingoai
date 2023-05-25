import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedWords {
        _id
        original_text
        en
      }
    }
  }
`;

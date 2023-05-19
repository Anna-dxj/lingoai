import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVED_WORD = gql`
  mutation savedWord(($wordID: String!, $l1_text: String!, $l2_text: String!) {
    savedWord(wordID: $wordID, l1_text: $l1_text, l2_text: $l2_text) {
      _id
      wordID
      l1_text
      l2_text
    }
  }
`;

export const REMOVE_WORD = gql`
  mutation remove($wordId: ID!) {
    removeWord(wordId: $wordId) {
      word {
        wordId
      }
    }
  }
`;

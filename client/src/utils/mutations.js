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
  mutation savedWord(($wordId: ID!, $original_text: String!, $es: String!) {
    savedWord(wordId: $wordId, original_text: $original_text, es: $es) {
      _id
      original_text
      translated_text {
        es
      }
    }
  }
`;

export const REMOVE_WORD = gql`
  mutation remove($wordId: ID!) {
    removeWord(wordId: $wordId) {
      word {
        _id
      }
    }
  }
`;

//client mutation for ChatGPT API
export const SEND_USER_INPUT = gql`
  mutation SendUserInput($input: String!) {
    sendUserInput(input: $input) {
      // Specify the fields you expect in the response
      // You can customize this based on your schema
      id
      message
    }
  }
`;

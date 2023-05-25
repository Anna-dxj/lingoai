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
`

export const ADD_USER = gql`
    mutation addUser ($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`

export const SAVED_WORD = gql`
  mutation savedWord( $original_text: String!, $en: String!) {
    savedWord( original_text: $original_text, en: $en) {
      _id
      savedWords {
        _id
        original_text
        en
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

//client mutation for ChatGPT Word Game
export const SEND_USER_INPUT = gql`
  mutation SendUserInput($input: String!) {
    sendUserInput(input: $input) {
      id
      message
    }
  }
`;

//client mutation for ChatGPT convo
export const SEND_USER_CHAT = gql`
  mutation SendUserChat($chat: String!) {
    sendUserChat(chat: $chat) {
      id
      message
    }
  }
`;

export const SEND_TRANSLATION = gql`
  mutation SendTranslation($word: String!) {
    sendTranslation(word: $word) {
      translated_text {
        en
      }
    }
  }
`;

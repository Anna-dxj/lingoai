const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedWords: [Word]
    wordCount: Int
  }

  type Word {
    _id: ID
    original_text: String!
    es: String!
  }

  input wordInput {
    _id: ID
    original_text: String!
    es: String!
  }

  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Response {
    id: ID!
    message: String!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    savedWord(original_text: String!, es: String!): User
    removeWord(wordId: ID!): User
    sendUserInput(input: String!): Response!
    sendUserChat(chat: String!): Response!
  }
`;

module.exports = typeDefs;

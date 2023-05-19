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
    wordID: String!
    l1_text: String!
    l2_text: String!
  }

  input wordInput {
    _id: ID
    wordID: String!
    l1_text: String!
    l2_text: String!
  }

  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    savedWord(wordID: String!, l1_text: String!, l2_text: String!): User
    removeWord(wordId: ID!): User
  }
`;

module.exports = typeDefs;

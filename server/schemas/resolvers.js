const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { callOpenAI } = require('../utils/API');
const { callOpenAIChat } = require('../utils/API');
const { callTranslateAPI } = require('../utils/API');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      // check if user exists with email and credentials
      if (!user) {
        throw new AuthenticationError('Incorrect credentials.');
      }
      const correctPassword = await user.isCorrectPassword(password);

      // check password
      if (!correctPassword) {
        throw new AuthenticationError('Incorrect credentials.');
      }

      const token = signToken(user);
      return { token, user };
    },
    savedWord: async (parent, { original_text, en }, context) => {
      console.log('test')
      console.log('og text', original_text)
      console.log('en', en)
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedWords: {original_text, en} } },
          { new: true, runValidators: true }
        );
        console.log(updateUser)
        return updateUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeWord: async (parent, { wordId }, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedWords: { wordId } } },
          { new: true, runValidators: true }
        );
        return updateUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    sendUserInput: async (_, { input }) => {
      const letter = input[input.length - 1];
      const response = await callOpenAI(letter);
      return {
        id: response.id,
        message: response.message,
      };
    },
    sendUserChat: async (_, { chat }) => {
      const response = await callOpenAIChat(chat);
      return {
        id: response.id,
        message: response.message,
      };
    },
    sendTranslation: async (_, { word }) => {
      const response = await callTranslateAPI(word);
      console.log(response.data);
      return response.data;
    },
  },
};

module.exports = resolvers;

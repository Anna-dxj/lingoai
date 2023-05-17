const { Schema, model } = require('mongoose');

const wordSchema = new Schema({
  wordID: {
    type: String,
    required: true,
  },
  l2_text: {
    type: String,
    required: true,
  },
  l1_text: {
    type: String,
    required: true,
  },
});

// const Word = model('Word', wordSchema);

module.exports = wordSchema;

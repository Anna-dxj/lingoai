const { Schema, model } = require('mongoose');

const wordSchema = new Schema({
  original_text: {
    type: String,
    required: true,
  },
  translated_text: [
    {
      es: {
        type: String,
        required: true,
      },
    },
  ],
});

// const Word = model('Word', wordSchema);

module.exports = wordSchema;

// const {
//   Configuration,
//   OpenAIApi,
//   CreateChatCompletionRequest,
// } = require('openai');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

async function callOpenAI(letter) {
  const { data } = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `Can you send me a one-word response in Spanish that starts with the letter ${letter}? Please don't provide the English translation`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  console.log(data);
  const obj = {
    id: data.id,
    message: data.choices[0].message.content,
  };
  console.log(obj);
  return obj;
}

async function callOpenAIChat(chat) {
  const { data } = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `${chat}`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  console.log(data);
  const obj = {
    id: data.id,
    message: data.choices[0].message.content,
  };
  console.log(obj);
  return obj;
}

async function callTranslateAPI(word) {
  const encodedParams = new URLSearchParams();
  encodedParams.set('text', `${word}`);
  encodedParams.set('to', 'en');
  encodedParams.set('from', 'es');

  const options = {
    method: 'POST',
    url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': `${process.env.API_KEY_NLP}`,
      'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com',
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    // console.log(response);
    const translation = response;
    return translation;
  } catch (error) {
    console.error(error);
  }
}

// })
// .catch((err) => {
//   console.log(process.env.API_KEY);
// });
//   const response = await axios('https://api.openapi.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${process.env.API_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'You are a helpful assistant.' },
//         {
//           role: 'user',
//           content: `Can you send me a word in Spanish that starts with the letter ${letter}?`,
//         },
//       ],
//     }),
//   });
//   const data = await response.json();
//   console.log(data);
//   return data;

module.exports = { callOpenAI, callOpenAIChat, callTranslateAPI };

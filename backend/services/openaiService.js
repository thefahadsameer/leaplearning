// backend/services/openaiService.js

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function askAI(message) {
  const knowledge = require("../data/knowledgeBase");

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: `
You are Leap Learning's AI Assistant.

Answer only questions related to Leap Learning.

${knowledge}
`
      },
      {
        role: "user",
        content: message
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = askAI;
const knowledgeBase = require("../data/knowledgeBase");
const { askGemini } = require("../services/geminiService");

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Message is required."
      });
    }

    const prompt = `
${knowledgeBase}

USER QUESTION:
${message}

ASSISTANT RESPONSE:
`;

    const reply = await askGemini(prompt);

    res.json({
      reply
    });

  } catch (error) {
    console.error("GEMINI ERROR:", error);

    res.status(500).json({
      reply:
        "Sorry, I'm unable to respond right now. Please try again shortly."
    });
  }
};
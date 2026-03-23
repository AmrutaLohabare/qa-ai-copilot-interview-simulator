const axios = require("axios");

const callOpenAI = async (prompt, retries = 2) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: "You are a QA interview expert. Always return valid JSON."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    if (retries > 0) {
      console.log("Retrying OpenAI...");
      return callOpenAI(prompt, retries - 1);
    }
    throw error;
  }
};

module.exports = { callOpenAI };
const { buildPrompt } = require("../prompts/interviewPrompt");
const { callOpenAI } = require("../services/openaiService");
const { extractJSON } = require("../utils/jsonParser");

const sessions = {};
const userSkills = {};

const handleInterview = async (req, res) => {
  const { topic, answer, userId } = req.body;

  // validations
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  const allowedTopics = ["Selenium", "API", "Java", "OOPS Concept", "Playwright"];

  if (!allowedTopics.includes(topic)) {
    return res.status(400).json({ error: "Invalid topic" });
  }

  if (answer === undefined || answer === null){
    const prompt = `
  You are a QA interviewer.

  Topic: ${topic}

  Ask the first interview question for this topic.

  Respond in JSON:
  {
    "score": 0,
    "feedback": "First question",
    "nextQuestion": "your question"
  }
  `;

    try {
      const aiResponse = await callOpenAI(prompt);
      const parsed = extractJSON(aiResponse);

      return res.json({
        ...parsed,
        progress: { scores: [], average: 0 }
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to generate question" });
    }
  }

  // session init
  if (!sessions[userId]) {
    sessions[userId] = "";
  }

  // get avg score for adaptive logic
  const avgScore = userSkills[userId]?.[topic]?.average || 5;

  const prompt = buildPrompt(
    topic,
    sessions[userId],
    answer,
    avgScore
  );

  try {
    const aiResponse = await callOpenAI(prompt);

    console.log("AI RAW RESPONSE:", aiResponse);

    const parsed = extractJSON(aiResponse);

    if (!parsed) {
      return res.status(500).json({
        error: "Invalid AI response",
        raw: aiResponse
      });
    }

    // update session history
    sessions[userId] += `\nCandidate: ${answer}\nAI: ${aiResponse}`;

    // skill tracking
    if (!userSkills[userId]) {
      userSkills[userId] = {};
    }

    if (!userSkills[userId][topic]) {
      userSkills[userId][topic] = {
        scores: [],
        average: 0
      };
    }

    userSkills[userId][topic].scores.push(parsed.score);

    const scores = userSkills[userId][topic].scores;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

    userSkills[userId][topic].average = avg;

    res.json({
      ...parsed,
      progress: userSkills[userId][topic]
    });

  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "AI processing failed" });
  }
};

module.exports = { handleInterview };
const buildPrompt = (topic, history, userAnswer, avgScore = 5) => {
  let difficulty = "beginner";

  if (avgScore >= 7) difficulty = "advanced";
  else if (avgScore >= 5) difficulty = "intermediate";

  const weakAreaNote =
    avgScore < 6
      ? "Candidate is weak in this topic. Focus on fundamentals and reinforce concepts."
      : "Candidate is performing well. Ask deeper, scenario-based or tricky questions.";

  return `
You are a senior QA interviewer.

Topic: ${topic}
Difficulty Level: ${difficulty}

${weakAreaNote}

Conversation so far:
${history}

Candidate's latest answer:
${userAnswer}

Instructions:
1. Evaluate the answer (score out of 10)
2. Give concise feedback
3. Ask next question based on difficulty level AND weak areas

Respond ONLY in JSON:
{
  "score": number,
  "feedback": "text",
  "nextQuestion": "text"
}
`;
};

module.exports = { buildPrompt };
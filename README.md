# 🚀 QA AI Copilot – Adaptive Interview Simulator

An AI-powered QA interview simulator that dynamically evaluates answers, adapts questions, and tracks performance using Generative AI.

---

## 🎯 Problem

Most QA interview preparation tools are static and do not simulate real interview behavior.

Candidates need:

* Dynamic questioning
* Real-time feedback
* Personalized difficulty

---

## 💡 Solution

QA AI Copilot uses Generative AI to simulate a real interviewer that:

* Asks adaptive questions
* Evaluates answers
* Tracks skill progression
* Focuses on weak areas

---

## 🧠 Key Features

### 🤖 Generative AI Integration

* Uses OpenAI API to generate dynamic interview questions
* Evaluates user responses intelligently
* Maintains conversational context

---

### 🎯 Adaptive Interview Engine

* Difficulty adjusts based on performance:

    * Beginner
    * Intermediate
    * Advanced

---

### 📊 Skill Tracking System

* Tracks topic-wise scores
* Calculates running average
* Shows progress in real-time

---

### 🔍 Weak Area Detection

* Identifies weak topics
* Focuses more on improvement areas

---

### 💬 Chat-based UI

* Interactive chat interface
* Simulates real interview experience

---

### 🌗 Dark / Light Mode

* Toggle UI theme for better usability

---

### 🛡️ Reliable AI Handling

* JSON parsing fallback
* Retry mechanism for LLM failures

---

## 🛠️ Tech Stack

* **Frontend**: React.js
* **Backend**: Node.js + Express
* **AI**: OpenAI API
* **Dev Tooling**: GitHub Copilot

---

## 🧱 Architecture

Frontend (React)
↓
Backend API (Node.js)
↓
Prompt Engine
↓
OpenAI API
↓
Response Parser + Skill Engine

---

## 🚀 How to Run

### 1. Clone Repo

```bash
git clone https://github.com/YOUR_USERNAME/qa-ai-copilot.git
cd qa-ai-copilot
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
OPENAI_API_KEY=your_api_key
```

Run:

```bash
node src/app.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🧪 API Example

POST `/api/interview`

```json
{
  "userId": "user1",
  "topic": "Selenium",
  "answer": "I use XPath to locate elements"
}
```

---

## 📈 Sample Output

```json
{
  "score": 5,
  "feedback": "...",
  "nextQuestion": "...",
  "progress": {
    "average": 5
  }
}
```

---

## 🎥 Demo

(Add demo video or GIF here)

---

## 🧠 Learnings

* Building stateful AI systems
* Prompt engineering for adaptive behavior
* Handling LLM unpredictability
* Designing real-time evaluation engines

---

## 🔥 Future Enhancements (v2)

* Analytics dashboard
* MCP integration
* Mic enable voice interaction

---

## 👩‍💻 Author

Built as part of QA + Generative AI learning journey.

/* ==========================================================================
   Module 2 Quick Quiz — questions and scoring. Everything runs and stays
   in the browser; nothing is saved or sent anywhere.
   ========================================================================== */

const PASS_PERCENT = 70;

const QUESTIONS = [
  {
    q: "What does the Messages API's context window actually represent?",
    options: [
      "Permanent server-side memory Claude retains between separate conversations",
      "The maximum amount of conversation, in tokens, Claude can see in a single request",
      "A cache of every request ever sent to the API",
      "The number of tool calls allowed per conversation",
    ],
    correct: 1,
  },
  {
    q: "Why use client.messages.stream() instead of a plain messages.create() call for a chat UI?",
    options: [
      "Streaming is cheaper per token",
      "Streaming is required before any tool can be attached",
      "It lets the UI show text as it's generated instead of waiting for the full response",
      "It skips the system prompt entirely",
    ],
    correct: 2,
  },
  {
    q: 'When Claude\'s response comes back with stop_reason: "tool_use", what should your code do?',
    options: [
      "End the conversation immediately",
      "Execute the requested tool yourself, send the result back as a tool_result block, then call the API again",
      "Wait for Claude to run the tool automatically",
      "Restart the conversation from scratch",
    ],
    correct: 1,
  },
  {
    q: "Why should a tool's incoming arguments never be trusted blindly, even though Claude generated them?",
    options: [
      "They arrive encrypted and must be decrypted first",
      "Claude generates them from the conversation, so they should be validated like any other untrusted input",
      "They're only used for logging, never for real logic",
      "The SDK automatically validates every argument",
    ],
    correct: 1,
  },
  {
    q: "What does createSdkMcpServer give you that a hand-rolled tool-use loop doesn't provide on its own?",
    options: [
      "Faster network requests to the Claude API",
      "A way to expose typed Node.js functions as an in-process MCP server, plus permission modes, subagents, and hooks",
      "Free, unlimited API usage",
      "Automatic UI generation for the chat widget",
    ],
    correct: 1,
  },
  {
    q: "What's the risk of leaving an agent's permission mode on an unreviewed default?",
    options: [
      "The agent responds more slowly",
      "Tool calls stop working entirely",
      "A default you haven't checked isn't actually a guardrail you have",
      "It forces every response to use Haiku",
    ],
    correct: 2,
  },
  {
    q: "A tool's own schema validation on its output fails. What should it do?",
    options: [
      "Silently return an empty or default result so the conversation keeps moving",
      "Retry the exact same call indefinitely until it passes",
      "Return an explicit, typed error result instead of forwarding bad data",
      "Crash the whole Node.js process",
    ],
    correct: 2,
  },
  {
    q: "Why can't an agent just keep resending the entire conversation history forever as a chat gets longer?",
    options: [
      "Claude automatically forgets anything older than 2 turns",
      "It eventually approaches the context window limit and gets more expensive, so older turns need summarizing or trimming",
      "The Messages API hard-caps every conversation at 5 messages",
      "It isn't actually a real problem in practice",
    ],
    correct: 1,
  },
  {
    q: "What's the safe default for a tool that writes data — creates an order, sends a message, changes state?",
    options: [
      "Execute immediately, for the smoothest user experience",
      "Require explicit confirmation until proven safe",
      "Only allow it to run once per day",
      "Never allow write-capable tools under any circumstances",
    ],
    correct: 1,
  },
  {
    q: "In Lab 2.6's multi-tool agent, why does calculate_discount pause for a y/n confirmation before it computes anything?",
    options: [
      "Claude requires a manual pause before every single tool call",
      "It's the lab's required guardrail — a tool that changes what the shopper is quoted needs a human-approved gate",
      "To artificially slow down API costs",
      "Because schema validation requires an interactive prompt",
    ],
    correct: 1,
  },
];

const state = { answers: new Array(QUESTIONS.length).fill(null) };

function renderQuestions() {
  const container = document.getElementById("questionsContainer");
  container.innerHTML = QUESTIONS.map((item, qIndex) => `
    <div class="quiz-question" data-qindex="${qIndex}">
      <span class="quiz-q-num">Question ${qIndex + 1} of ${QUESTIONS.length}</span>
      <p class="quiz-q-text">${item.q}</p>
      <div class="quiz-options">
        ${item.options.map((opt, oIndex) => `
          <label class="quiz-option" data-oindex="${oIndex}">
            <input type="radio" name="q${qIndex}" value="${oIndex}">
            <span>${opt}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".quiz-option input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const qIndex = Number(e.target.closest(".quiz-question").dataset.qindex);
      const oIndex = Number(e.target.value);
      state.answers[qIndex] = oIndex;

      const questionEl = e.target.closest(".quiz-question");
      questionEl.classList.remove("unanswered");
      questionEl.querySelectorAll(".quiz-option").forEach((opt) => opt.classList.remove("selected"));
      e.target.closest(".quiz-option").classList.add("selected");
    });
  });
}

function validateForm() {
  let valid = true;
  let firstUnanswered = null;

  document.querySelectorAll(".quiz-question").forEach((qEl, i) => {
    if (state.answers[i] === null) {
      qEl.classList.add("unanswered");
      valid = false;
      if (firstUnanswered === null) firstUnanswered = qEl;
    } else {
      qEl.classList.remove("unanswered");
    }
  });

  if (!valid && firstUnanswered) {
    firstUnanswered.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return valid;
}

function scoreQuiz() {
  let score = 0;
  const answerDetail = QUESTIONS.map((item, i) => {
    const isCorrect = state.answers[i] === item.correct;
    if (isCorrect) score++;
    return {
      question: item.q,
      selected: item.options[state.answers[i]],
      correctAnswer: item.options[item.correct],
      isCorrect,
    };
  });
  return { score, total: QUESTIONS.length, answerDetail };
}

function renderResults({ score, total, answerDetail }, name) {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= PASS_PERCENT;

  document.getElementById("quizFormSection").classList.add("hidden");
  const resultsSection = document.getElementById("quizResultsSection");
  resultsSection.classList.remove("hidden");

  const greeting = name ? `, ${name}` : "";
  const summary = document.getElementById("quizResultsSummary");
  summary.className = `quiz-results ${passed ? "pass" : "fail"}`;
  summary.innerHTML = `
    <div class="quiz-score-circle">
      <span class="num">${percentage}%</span>
      <span class="denom">${score} / ${total} correct</span>
    </div>
    <h2 style="margin:0 0 6px">${passed ? `Nice work${greeting} — you passed` : `Below the 70% pass mark${greeting}`}</h2>
    <p style="color:var(--text-muted);margin:0">Take another look at the review below, then retake it whenever you like.</p>
  `;

  const review = document.getElementById("quizReview");
  review.innerHTML = `
    <h3 style="margin:28px 0 14px">Review</h3>
    ${answerDetail.map((d, i) => `
      <div class="quiz-question">
        <span class="quiz-q-num">Question ${i + 1}</span>
        <p class="quiz-q-text">${d.question}</p>
        <div class="quiz-options">
          <div class="quiz-option ${d.isCorrect ? "result-correct" : "result-wrong"}">
            <span>Your answer: ${d.selected}</span>
            <span class="result-tag ${d.isCorrect ? "correct" : "wrong"}">${d.isCorrect ? "Correct" : "Incorrect"}</span>
          </div>
          ${!d.isCorrect ? `
            <div class="quiz-option result-correct">
              <span>Correct answer: ${d.correctAnswer}</span>
            </div>
          ` : ""}
        </div>
      </div>
    `).join("")}
  `;

  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetQuiz() {
  state.answers.fill(null);
  document.getElementById("quizForm").reset();
  document.getElementById("quizFormSection").classList.remove("hidden");
  document.getElementById("quizResultsSection").classList.add("hidden");
  renderQuestions();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();

  const form = document.getElementById("quizForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = scoreQuiz();
    const name = document.getElementById("traineeName").value.trim();
    renderResults(result, name);
  });

  document.getElementById("retakeBtn").addEventListener("click", resetQuiz);
});

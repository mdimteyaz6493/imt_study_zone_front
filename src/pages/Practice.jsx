
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import {
  getQuestions,
  checkAnswer,
} from "../services/api";

import "./Practice.css";

const Practice = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [subject, setSubject] = useState(null);

  // Stores answer result for every question
  // Example:
  // {
  //   questionId: {
  //     correct: true,
  //     selectedAnswer: 1,
  //     correctAnswer: 1,
  //     correctAnswerText: "...",
  //     explanation: "..."
  //   }
  // }
  const [answers, setAnswers] = useState({});

  const [loading, setLoading] = useState(true);
  const [checkingQuestion, setCheckingQuestion] =
    useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    loadQuestions();
  }, [slug]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getQuestions(slug);

      setQuestions(data.questions || []);
      setSubject(data.subject || null);

      setAnswers({});
      setCheckingQuestion(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load interview questions.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // Handle option click
  // ---------------------------------------
  const handleSelectAnswer = async (
    question,
    answerIndex
  ) => {
    const questionId = question._id;

    // Already answered
    if (answers[questionId]) {
      return;
    }

    // Already checking
    if (checkingQuestion === questionId) {
      return;
    }

    try {
      setCheckingQuestion(questionId);

      const response = await checkAnswer(
        questionId,
        answerIndex
      );

      console.log(
        "Interview Answer Response:",
        response
      );

      // Backend response:
      // {
      //   success: true,
      //   result: {...}
      // }

      const answerResult =
        response.result || response;

      console.log(
        "Actual Answer Result:",
        answerResult
      );

      setAnswers((prev) => ({
        ...prev,
        [questionId]: answerResult,
      }));
    } catch (err) {
      console.error(err);

      setError(
        "Unable to check your answer. Please try again."
      );
    } finally {
      setCheckingQuestion(null);
    }
  };

  // ---------------------------------------
  // Statistics
  // ---------------------------------------

  const answeredCount =
    Object.keys(answers).length;

  const correctCount =
    Object.values(answers).filter(
      (answer) => answer.correct
    ).length;

  const incorrectCount =
    Object.values(answers).filter(
      (answer) => !answer.correct
    ).length;

  const totalQuestions = questions.length;

  const progress =
    totalQuestions > 0
      ? (answeredCount / totalQuestions) * 100
      : 0;

  // ---------------------------------------
  // Back
  // ---------------------------------------

  const handleBack = () => {
    navigate(`/subject/${slug}`);
  };

  // ---------------------------------------
  // Loading
  // ---------------------------------------

  if (loading) {
    return (
      <div className="practice-page">
        <Loading />
      </div>
    );
  }

  // ---------------------------------------
  // Error
  // ---------------------------------------

  if (error && !questions.length) {
    return (
      <div className="practice-page">
        <ErrorMessage message={error} />

        <div className="practice-error-action">
          <button onClick={loadQuestions}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------
  // No Questions
  // ---------------------------------------

  if (!questions.length) {
    return (
      <div className="practice-page">
        <div className="practice-empty">

          <div className="practice-empty-icon">
            📚
          </div>

          <h2>
            No Questions Available
          </h2>

          <p>
            There are currently no interview questions
            available for this subject.
          </p>

          <button
            onClick={() => navigate("/")}
          >
            Back to Subjects
          </button>

        </div>
      </div>
    );
  }

  return (
    <main className="practice-page">

      <div className="practice-container">

        {/* ======================================
            TOP HEADER
        ====================================== */}

        <div className="practice-topbar">

          <button
            className="practice-back-button"
            onClick={handleBack}
          >
            <span>←</span>
            Exit Practice
          </button>

          <div className="practice-subject">

            <span className="practice-subject-icon">
              🎯
            </span>

            <div>

              <span className="practice-subject-label">
                Theory Practice
              </span>

              <strong>
                {subject?.name || slug}
              </strong>

            </div>

          </div>

        </div>

        {/* ======================================
            ERROR MESSAGE
        ====================================== */}

        {error && (
          <div className="practice-inline-error">
            {error}
          </div>
        )}

        {/* ======================================
            MAIN LAYOUT
        ====================================== */}

        <div className="practice-layout">

          {/* ====================================
              LEFT - ALL QUESTIONS
          ==================================== */}

          <div className="practice-questions">

            {questions.map(
              (question, questionIndex) => {

                const questionId =
                  question._id;

                const feedback =
                  answers[questionId];

                const isAnswered =
                  !!feedback;

                const isChecking =
                  checkingQuestion ===
                  questionId;

                return (
                  <section
                    className={`interview-question-card ${
                      isAnswered
                        ? feedback.correct
                          ? "question-correct"
                          : "question-incorrect"
                        : ""
                    }`}
                    key={questionId}
                  >

                    {/* Question Header */}
                    <div className="interview-question-header">

                      <div className="question-number">
                        Q{questionIndex + 1}
                      </div>

                      <div className="question-meta">

                        {question.difficulty && (
                          <span
                            className={`difficulty-badge ${question.difficulty.toLowerCase()}`}
                          >
                            {question.difficulty}
                          </span>
                        )}

                        {question.topic && (
                          <span className="topic-badge">
                            {question.topic}
                          </span>
                        )}

                      </div>

                    </div>

                    {/* Question */}
                    <h2 className="interview-question-text">
                      {question.question}
                    </h2>

                    <p className="interview-question-instruction">
                      Select an option to answer this question.
                    </p>

                    {/* =================================
                        OPTIONS
                    ================================= */}

                    <div className="interview-options">

                      {question.options.map(
                        (option, optionIndex) => {

                          const isSelected =
                            feedback &&
                            Number(
                              feedback.selectedAnswer
                            ) === optionIndex;

                          const isCorrect =
                            feedback &&
                            Number(
                              feedback.correctAnswer
                            ) === optionIndex;

                          const isWrongSelected =
                            feedback &&
                            isSelected &&
                            !feedback.correct;

                          let optionClass =
                            "interview-option";

                          if (isSelected) {
                            optionClass +=
                              " option-selected";
                          }

                          if (isCorrect) {
                            optionClass +=
                              " option-correct";
                          }

                          if (isWrongSelected) {
                            optionClass +=
                              " option-wrong";
                          }

                          if (
                            isChecking
                          ) {
                            optionClass +=
                              " option-checking";
                          }

                          return (
                            <button
                              key={optionIndex}
                              type="button"
                              className={optionClass}
                              disabled={
                                isAnswered ||
                                isChecking
                              }
                              onClick={() =>
                                handleSelectAnswer(
                                  question,
                                  optionIndex
                                )
                              }
                            >

                              <span className="interview-option-letter">
                                {String.fromCharCode(
                                  65 + optionIndex
                                )}
                              </span>

                              <span className="interview-option-text">
                                {option}
                              </span>

                              <span className="interview-option-status">

                                {isCorrect && (
                                  <span className="status-correct">
                                    ✓
                                  </span>
                                )}

                                {isWrongSelected && (
                                  <span className="status-wrong">
                                    ✕
                                  </span>
                                )}

                                {isChecking &&
                                  isSelected && (
                                    <span className="status-loading">
                                      ...
                                    </span>
                                  )}

                              </span>

                            </button>
                          );
                        }
                      )}

                    </div>

                    {/* =================================
                        ANSWER FEEDBACK
                    ================================= */}

                    {feedback && (
                      <div
                        className={`interview-feedback ${
                          feedback.correct
                            ? "feedback-correct"
                            : "feedback-wrong"
                        }`}
                      >

                        {/* Feedback Header */}
                        <div className="interview-feedback-header">

                          <div className="interview-feedback-icon">

                            {feedback.correct
                              ? "✓"
                              : "✕"}

                          </div>

                          <div>

                            <h3>
                              {feedback.correct
                                ? "Correct Answer!"
                                : "Incorrect Answer"}
                            </h3>

                            <p>
                              {feedback.correct
                                ? "Your selected answer is correct."
                                : "Your selected answer is incorrect."}
                            </p>

                          </div>

                        </div>

                        {/* Correct Answer */}
                        {/* <div className="answer-detail-box">

                          <span className="answer-detail-label">
                            Correct Answer
                          </span>

                          <strong>

                            {String.fromCharCode(
                              65 +
                                Number(
                                  feedback.correctAnswer
                                )
                            )}

                            .{" "}

                            {feedback.correctAnswerText ||
                              question.options[
                                Number(
                                  feedback.correctAnswer
                                )
                              ]}

                          </strong>

                        </div> */}

                        {/* Explanation */}
                        {feedback.explanation && (
                          <div className="interview-explanation">

                            <div className="interview-explanation-title">

                              <span>
                                💡
                              </span>

                              Explanation

                            </div>

                            <p>
                              {feedback.explanation}
                            </p>

                          </div>
                        )}

                      </div>
                    )}

                  </section>
                );
              }
            )}

            {/* Completed Message */}
            {answeredCount === totalQuestions && (
              <div className="practice-complete-card">

                <div className="practice-complete-icon">
                  🎉
                </div>

                <h2>
                  Practice Completed!
                </h2>

                <p>
                  You answered all {totalQuestions} questions.
                </p>

                <div className="practice-complete-stats">

                  <div>
                    <strong>
                      {correctCount}
                    </strong>

                    <span>
                      Correct
                    </span>
                  </div>

                  <div>
                    <strong>
                      {incorrectCount}
                    </strong>

                    <span>
                      Incorrect
                    </span>
                  </div>

                  <div>
                    <strong>
                      {totalQuestions}
                    </strong>

                    <span>
                      Total
                    </span>
                  </div>

                </div>

                <button
                  className="view-result-button"
                  onClick={() =>
                    navigate("/result", {
                      state: {
                        subject:
                          subject?.name || slug,
                        slug,
                        total: totalQuestions,
                        correct: correctCount,
                        incorrect:
                          incorrectCount,
                      },
                    })
                  }
                >
                  View Final Result
                  <span>→</span>
                </button>

              </div>
            )}

          </div>

          {/* ====================================
              RIGHT - RESULT SIDEBAR
          ==================================== */}

          <aside className="practice-result-sidebar">

            <div className="result-sidebar-card">

              {/* Sidebar Header */}
              <div className="result-sidebar-header">

                <div>
                  <span className="result-sidebar-label">
                    Your Result
                  </span>

                  <h2>
                    {subject?.name || slug}
                  </h2>
                </div>

                <div className="result-sidebar-icon">
                  🎯
                </div>

              </div>

              {/* Main Counter */}
              <div className="result-main-counter">

                <strong>
                  {answeredCount}
                  <span>
                    /{totalQuestions}
                  </span>
                </strong>

                <p>
                  Questions Answered
                </p>

              </div>

              {/* Progress */}
              <div className="result-progress-section">

                <div className="result-progress-header">

                  <span>
                    Progress
                  </span>

                  <strong>
                    {Math.round(progress)}%
                  </strong>

                </div>

                <div className="result-progress-track">

                  <div
                    className="result-progress-fill"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

              {/* Stats */}
              <div className="result-stats">

                <div className="result-stat correct-stat">

                  <div className="result-stat-icon">
                    ✓
                  </div>

                  <div>

                    <strong>
                      {correctCount}
                    </strong>

                    <span>
                      Correct
                    </span>

                  </div>

                </div>

                <div className="result-stat wrong-stat">

                  <div className="result-stat-icon">
                    ✕
                  </div>

                  <div>

                    <strong>
                      {incorrectCount}
                    </strong>

                    <span>
                      Incorrect
                    </span>

                  </div>

                </div>

              </div>

              {/* Question Navigation */}
              <div className="question-map-section">

                <div className="question-map-title">
                  Questions
                </div>

                <div className="question-map">

                  {questions.map(
                    (question, index) => {

                      const result =
                        answers[question._id];

                      let className =
                        "question-map-item";

                      if (result) {
                        className += result.correct
                          ? " map-correct"
                          : " map-wrong";
                      } else {
                        className +=
                          " map-unanswered";
                      }

                      return (
                        <div
                          key={question._id}
                          className={className}
                          title={`Question ${
                            index + 1
                          }`}
                        >
                          {index + 1}
                        </div>
                      );
                    }
                  )}

                </div>

              </div>

              {/* Bottom Info */}
              <div className="result-sidebar-tip">

                <span>
                  💡
                </span>

                <p>
                  Click an option under any question
                  to instantly check your answer.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
};

export default Practice;



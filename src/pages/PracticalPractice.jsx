
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import {
  getPracticalQuestions,
  checkPracticalAnswer,
} from "../services/api";

import "./PracticalPractice.css";

const PracticalPractice = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [subject, setSubject] = useState(null);

  /*
    Stores answer result for every question.

    Example:

    {
      questionId: {
        correct: true,
        selectedAnswer: 0,
        selectedAnswerText: "...",
        correctAnswer: 0,
        correctAnswerText: "...",
        explanation: "..."
      }
    }
  */
  const [answers, setAnswers] = useState({});

  const [loading, setLoading] = useState(true);
  const [checkingQuestion, setCheckingQuestion] =
    useState(null);

  const [error, setError] = useState("");

  // =========================================
  // LOAD PRACTICAL QUESTIONS
  // =========================================

  useEffect(() => {
    loadQuestions();
  }, [slug]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPracticalQuestions(slug);

      setQuestions(data.questions || []);
      setSubject(data.subject || null);

      setAnswers({});
      setCheckingQuestion(null);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load practical questions."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // HANDLE OPTION CLICK
  // =========================================

  const handleSelectAnswer = async (
    question,
    answerIndex
  ) => {
    const questionId = question._id;

    // Already answered
    if (answers[questionId]) {
      return;
    }

    // Currently checking
    if (checkingQuestion === questionId) {
      return;
    }

    try {
      setCheckingQuestion(questionId);
      setError("");

      const response =
        await checkPracticalAnswer(
          questionId,
          answerIndex
        );

      console.log(
        "Practical Answer Response:",
        response
      );

      /*
        Backend response:

        {
          success: true,
          result: {
            correct: true,
            ...
          }
        }

        Some API implementations may directly
        return the result, so both are supported.
      */

      const answerResult =
        response.result || response;

      console.log(
        "Actual Practical Answer Result:",
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

  // =========================================
  // RESULT STATISTICS
  // =========================================

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

  const totalQuestions =
    questions.length;

  const progress =
    totalQuestions > 0
      ? (answeredCount / totalQuestions) * 100
      : 0;

  // =========================================
  // BACK
  // =========================================

  const handleBack = () => {
    navigate(`/subject/${slug}`);
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="practical-page">
        <Loading />
      </div>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error && !questions.length) {
    return (
      <div className="practical-page">

        <ErrorMessage message={error} />

        <div className="practical-error-action">
          <button onClick={loadQuestions}>
            Try Again
          </button>
        </div>

      </div>
    );
  }

  // =========================================
  // EMPTY
  // =========================================

  if (!questions.length) {
    return (
      <div className="practical-page">

        <div className="practical-empty">

          <div className="practical-empty-icon">
            💻
          </div>

          <h2>
            No Practical Questions Available
          </h2>

          <p>
            There are currently no practical
            questions available for this subject.
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
    <main className="practical-page">

      <div className="practical-container">

        {/* =====================================
            TOP HEADER
        ===================================== */}

        <div className="practical-topbar">

          <button
            className="practical-back-button"
            onClick={handleBack}
          >
            <span>←</span>
            Exit Practice
          </button>

          <div className="practical-subject">

            <span className="practical-subject-icon">
              💻
            </span>

            <div>

              <span className="practical-subject-label">
                Practical Practice
              </span>

              <strong>
                {subject?.name || slug}
              </strong>

            </div>

          </div>

        </div>

        {/* =====================================
            ERROR
        ===================================== */}

        {error && (
          <div className="practical-inline-error">
            {error}
          </div>
        )}

        {/* =====================================
            MAIN LAYOUT
        ===================================== */}

        <div className="practical-layout">

          {/* ===================================
              LEFT - QUESTIONS
          =================================== */}

          <div className="practical-questions">

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
                    key={questionId}
                    className={`practical-question-card ${
                      isAnswered
                        ? feedback.correct
                          ? "question-correct"
                          : "question-incorrect"
                        : ""
                    }`}
                  >

                    {/* =================================
                        QUESTION HEADER
                    ================================= */}

                    <div className="practical-question-header">

                      <div className="practical-question-number">
                        Q{questionIndex + 1}
                      </div>

                      <div className="practical-question-meta">

                        {question.difficulty && (
                          <span
                            className={`practical-difficulty ${question.difficulty.toLowerCase()}`}
                          >
                            {question.difficulty}
                          </span>
                        )}

                        {question.topic && (
                          <span className="practical-topic">
                            {question.topic}
                          </span>
                        )}

                      </div>

                    </div>

                    {/* =================================
                        QUESTION TITLE
                    ================================= */}

                    {question.title && (
                      <h2 className="practical-question-title">
                        {question.title}
                      </h2>
                    )}

                    {/* =================================
                        QUESTION
                    ================================= */}

                    <p className="practical-question-text">
                      {question.question}
                    </p>

                    <p className="practical-question-instruction">
                      Select the correct SQL query.
                    </p>

                    {question.code && (
  <div className="practical-code-block">
    <div className="practical-code-header">
      <span>C</span>
      <span>Code</span>
    </div>

    <pre>
      <code>{question.code}</code>
    </pre>
  </div>
)}

                    {/* =================================
                        TABLES
                    ================================= */}

                    {question.tables?.length > 0 && (
                      <div className="practical-tables">

                        {question.tables.map(
                          (table, tableIndex) => (

                            <div
                              className="practical-table-wrapper"
                              key={tableIndex}
                            >

                              <div className="practical-table-header">

                                <div className="table-name">

                                  <span>
                                    🗃️
                                  </span>

                                  {table.name}

                                </div>

                                <span className="table-record-count">
                                  {table.rows?.length || 0} rows
                                </span>

                              </div>

                              <div className="practical-table-scroll">

                                <table className="practical-data-table">

                                  <thead>
                                    <tr>

                                      {table.columns.map(
                                        (
                                          column,
                                          columnIndex
                                        ) => (
                                          <th
                                            key={
                                              columnIndex
                                            }
                                          >

                                            <span>
                                              {
                                                column.name
                                              }
                                            </span>

                                            <small>
                                              {
                                                column.type
                                              }
                                            </small>

                                          </th>
                                        )
                                      )}

                                    </tr>
                                  </thead>

                                  <tbody>

                                    {table.rows?.map(
                                      (
                                        row,
                                        rowIndex
                                      ) => (

                                        <tr
                                          key={
                                            rowIndex
                                          }
                                        >

                                          {row.map(
                                            (
                                              cell,
                                              cellIndex
                                            ) => (
                                              <td
                                                key={
                                                  cellIndex
                                                }
                                              >
                                                {String(
                                                  cell
                                                )}
                                              </td>
                                            )
                                          )}

                                        </tr>

                                      )
                                    )}

                                  </tbody>

                                </table>

                              </div>

                            </div>

                          )
                        )}

                      </div>
                    )}

                    {/* =================================
                        SQL OPTIONS
                    ================================= */}

                    <div className="practical-options">

                      {question.options.map(
                        (
                          option,
                          optionIndex
                        ) => {

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
                            "practical-option";

                          if (isSelected) {
                            optionClass +=
                              " option-selected";
                          }

                          if (isCorrect) {
                            optionClass +=
                              " option-correct";
                          }

                          if (
                            isWrongSelected
                          ) {
                            optionClass +=
                              " option-wrong";
                          }

                          if (isChecking) {
                            optionClass +=
                              " option-checking";
                          }

                          return (
                            <button
                              key={optionIndex}
                              type="button"
                              className={
                                optionClass
                              }
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

                              <span className="practical-option-letter">
                                {String.fromCharCode(
                                  65 +
                                    optionIndex
                                )}
                              </span>

                              <pre className="practical-option-code">
                                {option}
                              </pre>

                              <span className="practical-option-status">

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
                        FEEDBACK
                    ================================= */}

                    {feedback && (
                      <div
                        className={`practical-feedback ${
                          feedback.correct
                            ? "feedback-correct"
                            : "feedback-wrong"
                        }`}
                      >

                        {/* Feedback Header */}

                        <div className="practical-feedback-header">

                          <div className="practical-feedback-icon">

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
                                ? "Your selected SQL query is correct."
                                : "Your selected SQL query is incorrect."}
                            </p>

                          </div>

                        </div>

                        {/* Your Answer */}

                        <div className="practical-answer-box">

                          <span className="practical-answer-label">
                            Your Answer
                          </span>

                          <pre>
                            {feedback.selectedAnswerText ||
                              question.options[
                                Number(
                                  feedback.selectedAnswer
                                )
                              ]}
                          </pre>

                        </div>

                        {/* Correct Answer */}

                        <div className="practical-correct-query">

                          <span className="practical-correct-query-label">
                            Correct Answer
                          </span>

                          <pre>
                            {feedback.correctAnswerText ||
                              question.options[
                                Number(
                                  feedback.correctAnswer
                                )
                              ]}
                          </pre>

                        </div>

                        {/* Explanation */}

                        {feedback.explanation && (
                          <div className="practical-explanation">

                            <div className="practical-explanation-title">

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

            {/* =====================================
                COMPLETED
            ===================================== */}

            {answeredCount === totalQuestions && (
              <div className="practical-complete-card">

                <div className="practical-complete-icon">
                  🎉
                </div>

                <h2>
                  Practical Practice Completed!
                </h2>

                <p>
                  You answered all{" "}
                  {totalQuestions} practical questions.
                </p>

                <div className="practical-complete-stats">

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
                  className="practical-view-result-button"
                  onClick={() =>
                    navigate(
                      "/practical-result",
                      {
                        state: {
                          subject:
                            subject?.name ||
                            slug,
                          slug,
                          total:
                            totalQuestions,
                          correct:
                            correctCount,
                          incorrect:
                            incorrectCount,
                        },
                      }
                    )
                  }
                >
                  View Final Result
                  <span>→</span>
                </button>

              </div>
            )}

          </div>

          {/* ===================================
              RIGHT SIDEBAR
          =================================== */}

          <aside className="practical-result-sidebar">

            <div className="practical-result-card">

              {/* Header */}

              <div className="practical-result-header">

                <div>

                  <span className="practical-result-label">
                    Your Result
                  </span>

                  <h2>
                    {subject?.name || slug}
                  </h2>

                  <small>
                    Practical SQL
                  </small>

                </div>

                <div className="practical-result-icon">
                  💻
                </div>

              </div>

              {/* Main Counter */}

              <div className="practical-main-counter">

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

              <div className="practical-progress-section">

                <div className="practical-progress-header">

                  <span>
                    Progress
                  </span>

                  <strong>
                    {Math.round(progress)}%
                  </strong>

                </div>

                <div className="practical-progress-track">

                  <div
                    className="practical-progress-fill"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

              {/* Stats */}

              <div className="practical-result-stats">

                <div className="practical-result-stat practical-correct-stat">

                  <div className="practical-result-stat-icon">
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

                <div className="practical-result-stat practical-wrong-stat">

                  <div className="practical-result-stat-icon">
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

              {/* Question Map */}

              <div className="practical-question-map-section">

                <div className="practical-question-map-title">
                  Questions
                </div>

                <div className="practical-question-map">

                  {questions.map(
                    (question, index) => {

                      const result =
                        answers[question._id];

                      let className =
                        "practical-map-item";

                      if (result) {
                        className +=
                          result.correct
                            ? " map-correct"
                            : " map-wrong";
                      } else {
                        className +=
                          " map-unanswered";
                      }

                      return (
                        <div
                          key={question._id}
                          className={
                            className
                          }
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

              {/* Tip */}

              <div className="practical-result-tip">

                <span>
                  💡
                </span>

                <p>
                  Click any SQL query option to
                  instantly check your answer.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
};

export default PracticalPractice;


import { useNavigate, useParams } from "react-router-dom";
import "./SubjectPractice.css";

const SubjectPractice = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const isSQL = slug === "sql";
  const isC = slug === "c";

  const subjectName =
    slug === "javascript"
      ? "JavaScript"
      : slug === "nodejs"
      ? "Node.js"
      : slug === "mongodb"
      ? "MongoDB"
      : slug
      ? slug.charAt(0).toUpperCase() + slug.slice(1)
      : "Subject";

  return (
    <div className="subject-practice-page">
      <div className="subject-practice-container">

        {/* Back Button */}
        <button
          className="subject-back-button"
          onClick={() => navigate("/")}
        >
          <span>←</span>
          Back to Subjects
        </button>

        {/* Header */}
        <div className="subject-practice-header">
          <div className="subject-practice-badge">
            <span>✦</span>
            Practice Mode
          </div>

          <h1>{subjectName} Practice</h1>

          <p>
            Choose how you want to practice and improve your
            {isSQL || isC ? ` ${subjectName} ` : " "}interview skills.
          </p>
        </div>

        {/* Practice Modes */}
        <div className="practice-mode-grid">

          {/* =========================
              INTERVIEW QUESTIONS
          ========================== */}
          <div className="practice-mode-card interview-card">

            <div className="mode-card-top">
              <div className="mode-icon interview-icon">
                🎯
              </div>

              <span className="mode-badge">
                Theory
              </span>
            </div>

            <h2>
              Theory Questions
            </h2>

            <p>
              Practice multiple-choice interview questions
              and test your theoretical knowledge.
            </p>

            <div className="mode-features">

              <div className="mode-feature">
                <span>✓</span>
                Multiple Choice Questions
              </div>

              <div className="mode-feature">
                <span>✓</span>
                Instant Answer Checking
              </div>

              <div className="mode-feature">
                <span>✓</span>
                Detailed Explanations
              </div>

              <div className="mode-feature">
                <span>✓</span>
                Final Score
              </div>

            </div>

            <div className="mode-info">
              <span>50 Questions</span>
              <span>MCQ</span>
            </div>

            <button
              className="mode-button interview-button"
              onClick={() => navigate(`/practice/${slug}`)}
            >
              Start Practice
              <span>→</span>
            </button>

          </div>

          {/* =========================
              PRACTICAL SQL
          ========================== */}
          {isSQL && (
            <div className="practice-mode-card practical-card">

              <div className="mode-card-top">
                <div className="mode-icon practical-icon">
                  💻
                </div>

                <span className="mode-badge practical-badge">
                  Practical
                </span>
              </div>

              <h2>
                Practical SQL
              </h2>

              <p>
                Practice SQL queries using real-world table
                data and identify the correct query.
              </p>

              <div className="mode-features">

                <div className="mode-feature">
                  <span>✓</span>
                  Real Table Data
                </div>

                <div className="mode-feature">
                  <span>✓</span>
                  SQL Query Questions
                </div>

                <div className="mode-feature">
                  <span>✓</span>
                  Instant Query Checking
                </div>

                <div className="mode-feature">
                  <span>✓</span>
                  Query Explanation
                </div>

              </div>

              <div className="mode-info">
                <span>20 Questions</span>
                <span>SQL Queries</span>
              </div>

              <button
                className="mode-button practical-button"
                onClick={() => navigate(`/practical/${slug}`)}
              >
                Start Practical SQL
                <span>→</span>
              </button>

            </div>
          )}

          {/* =========================
              PRACTICAL C
          ========================== */}
          {isC && (
            <div className="practice-mode-card practical-card">

              <div className="mode-card-top">
                <div className="mode-icon practical-icon">
                  💻
                </div>

                <span className="mode-badge practical-badge">
                  Practical
                </span>
              </div>

              <h2>
                Practical C
              </h2>

              <p>
                Practice C programming using real code
                examples, output prediction and debugging
                based questions.
              </p>

              <div className="mode-features">

                <div className="mode-feature">
                  <span>✓</span>
                  Real C Code Examples
                </div>

                <div className="mode-feature">
                  <span>✓</span>
                  Output Prediction
                </div>

                <div className="mode-feature">
                  <span>✓</span>
                  Instant Answer Checking
                </div>

                <div className="mode-feature">
                  <span>✓</span>
                  Code Explanation
                </div>

              </div>

              <div className="mode-info">
                <span>20 Questions</span>
                <span>C Programming</span>
              </div>

              <button
                className="mode-button practical-button"
                onClick={() => navigate(`/practical/${slug}`)}
              >
                Start Practical C
                <span>→</span>
              </button>

            </div>
          )}

        </div>

        {/* Information */}
        <div className="practice-info-box">

          <div className="info-icon">
            💡
          </div>

          <div>
            <h3>
              Practice Tip
            </h3>

            <p>
              Read each question carefully before selecting
              your answer. You will get an explanation after
              every answer to help you understand the concept.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SubjectPractice;
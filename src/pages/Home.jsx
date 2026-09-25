import { useEffect, useState } from "react";

import SubjectCard from "../components/SubjectCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getSubjects } from "../services/api";
import "./home.css"

function Home() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSubjects();

      setSubjects(data.subjects || []);
    } catch (err) {
      setError(err.message || "Unable to load subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const subjectCount = subjects.length || 19;

  return (
    <div className="home-page">

      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section className="hero">
        <div className="hero-container">

          <div className="hero-content">

            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              LEARN
            </div>

            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              PRACTICE
            </div>

            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              GROW
            </div>

            <h1>
             Learn Smarter.
              <br />
              <span> Practice Better.</span>
            </h1>

            <p className="hero-description">
             IMT STUDY ZONE is a learning and practice platform where you can improve your technical skills, prepare for interviews, and practice important questions across multiple subjects.
            </p>

            <div className="hero-actions">
              <a href="#subjects" className="hero-button">
                Start Practicing
                <span>→</span>
              </a>

              <a href="#how-it-works" className="hero-secondary-button">
                How it works
                <span>↓</span>
              </a>
            </div>

            {/* HERO STATS */}

            <div className="hero-stats">

              <div className="hero-stat">
                <strong>{subjectCount}+</strong>
                <span>Practice Subjects</span>
              </div>

              <div className="hero-stat">
                <strong>50</strong>
                <span>Questions / Set</span>
              </div>

              <div className="hero-stat">
                <strong>100%</strong>
                <span>Free Practice</span>
              </div>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="hero-card">

              <div className="hero-card-top">
                <div>
                  <span className="mini-label">
                    INTERVIEW PRACTICE
                  </span>

                  <h3>
                    Test your knowledge
                  </h3>
                </div>

                <div className="hero-card-icon">
                  ✓
                </div>
              </div>


              <div className="hero-question">

                <span className="question-number">
                  Question 12 of 50
                </span>

                <h4>
                  Which keyword is used to define a
                  function in JavaScript?
                </h4>

              </div>


              <div className="hero-options">

                <div className="hero-option">
                  <span>A</span>
                  define
                </div>

                <div className="hero-option correct">
                  <span>B</span>
                  function

                  <strong>✓</strong>
                </div>

                <div className="hero-option">
                  <span>C</span>
                  func
                </div>

                <div className="hero-option">
                  <span>D</span>
                  method
                </div>

              </div>


              <div className="hero-feedback">
                <div className="feedback-icon">
                  ✓
                </div>

                <div>
                  <strong>Correct Answer</strong>
                  <p>
                    Great! Keep going.
                  </p>
                </div>
              </div>

            </div>


            {/* FLOATING CARDS */}

            <div className="floating-card floating-card-one">
              <span className="floating-icon">✓</span>

              <div>
                <strong>Instant Feedback</strong>
                <small>Learn immediately</small>
              </div>
            </div>


            <div className="floating-card floating-card-two">
              <span className="floating-icon">50</span>

              <div>
                <strong>Questions</strong>
                <small>Per practice set</small>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================
          SUBJECTS SECTION
      ========================================= */}

      <section
        className="subjects-section"
        id="subjects"
      >

        <div className="section-container">

          <div className="section-header">

            <div>
              <span className="section-label">
                PRACTICE LIBRARY
              </span>

              <h2>
                Choose your subject
              </h2>

              <p>
                Pick a subject and start practicing
                interview-style questions.
              </p>
            </div>

            {/* {!loading && !error && subjects.length > 0 && (
              <div className="subject-count">
                <strong>{subjects.length}</strong>
                <span>Subjects Available</span>
              </div>
            )} */}

          </div>


          {/* LOADING */}

          {loading && (
            <Loading text="Loading subjects..." />
          )}


          {/* ERROR */}

          {!loading && error && (
            <ErrorMessage
              message={error}
              onRetry={fetchSubjects}
            />
          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            subjects.length === 0 && (
              <div className="empty-state">
                No subjects available.
              </div>
            )}


  
{/* SUBJECT CARDS */}

{!loading &&
  !error &&
  subjects.length > 0 && (
    <>
      <div className="subjects-grid">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject._id}
            subject={subject}
          />
        ))}
      </div>

      {/* ALL PRACTICE SET BUTTON */}
      <div className="all-practice-wrapper">
        <a href="/practice-sets" className="all-practice-button">
          View All Practice Sets
          <span>→</span>
        </a>
      </div>
    </>
  )}

        </div>

      </section>


      {/* =========================================
          FEATURES
      ========================================= */}

      <section className="features-section">

        <div className="section-container">

          <div className="section-header center">

            <span className="section-label">
              WHY INTERVIEWPREP
            </span>

            <h2>
              Practice designed for real interviews
            </h2>

            <p>
              Focus on understanding concepts instead of
              simply memorizing answers.
            </p>

          </div>


          <div className="features-grid">

            <div className="feature-card">

              <div className="feature-icon">
                ?
              </div>

              <h3>
                Interview-Style Questions
              </h3>

              <p>
                Practice carefully structured MCQs covering
                important concepts commonly discussed in
                technical interviews.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                ✓
              </div>

              <h3>
                Instant Answer Checking
              </h3>

              <p>
                Get immediate feedback after selecting an
                option. Know exactly whether your answer
                is correct or incorrect.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                !
              </div>

              <h3>
                Learn From Mistakes
              </h3>

              <p>
                Every question includes an explanation so
                you can understand the concept behind the
                correct answer.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                %
              </div>

              <h3>
                Final Practice Result
              </h3>

              <p>
                Complete your practice set and review your
                correct and incorrect answers with your
                final score.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          PRACTICE MODES
      ========================================= */}

      <section className="practice-modes-section">

        <div className="section-container">

          <div className="practice-modes-wrapper">

            <div className="practice-modes-content">

              <span className="section-label">
                PRACTICE MODES
              </span>

              <h2>
                Go beyond basic MCQs
              </h2>

              <p>
                Prepare for interviews with different
                types of practice depending on the subject.
              </p>


              <div className="mode-list">

                <div className="mode-item">

                  <div className="mode-number">
                    01
                  </div>

                  <div>
                    <h3>
                      Interview Questions
                    </h3>

                    <p>
                      50 interview-style multiple-choice
                      questions with instant explanations.
                    </p>
                  </div>

                </div>


                <div className="mode-item">

                  <div className="mode-number">
                    02
                  </div>

                  <div>
                    <h3>
                      Practical Practice
                    </h3>

                    <p>
                      Practice practical questions, code,
                      queries, and problem-solving concepts
                      for supported subjects.
                    </p>
                  </div>

                </div>

              </div>

            </div>


            <div className="practice-modes-card">

              <div className="practice-preview-header">
                <span>YOUR PRACTICE</span>

                <div className="preview-status">
                  ● Live
                </div>
              </div>


              <div className="preview-progress">

                <div className="preview-progress-top">
                  <span>Questions Answered</span>
                  <strong>32 / 50</strong>
                </div>

                <div className="preview-progress-bar">
                  <span></span>
                </div>

              </div>


              <div className="preview-stats">

                <div>
                  <strong>24</strong>
                  <span>Correct</span>
                </div>

                <div>
                  <strong>8</strong>
                  <span>Incorrect</span>
                </div>

                <div>
                  <strong>64%</strong>
                  <span>Progress</span>
                </div>

              </div>


              <div className="question-map">

                {Array.from({ length: 20 }, (_, index) => (
                  <span
                    key={index}
                    className={
                      index < 13
                        ? "map-done"
                        : index < 16
                        ? "map-wrong"
                        : "map-empty"
                    }
                  >
                    {index + 1}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          HOW IT WORKS
      ========================================= */}

      <section
        className="how-section"
        id="how-it-works"
      >

        <div className="section-container">

          <div className="section-header center">

            <span className="section-label">
              HOW IT WORKS
            </span>

            <h2>
              Simple practice. Better preparation.
            </h2>

            <p>
              Follow four simple steps to improve your
              interview preparation.
            </p>

          </div>


          <div className="steps">

            <div className="step">

              <div className="step-number">
                01
              </div>

              <div className="step-line"></div>

              <h3>
                Choose a subject
              </h3>

              <p>
                Select Python, SQL, JavaScript, React,
                Excel, Data Analytics or another subject.
              </p>

            </div>


            <div className="step">

              <div className="step-number">
                02
              </div>

              <div className="step-line"></div>

              <h3>
                Start practicing
              </h3>

              <p>
                Solve a complete practice set containing
                interview-focused questions.
              </p>

            </div>


            <div className="step">

              <div className="step-number">
                03
              </div>

              <div className="step-line"></div>

              <h3>
                Get instant feedback
              </h3>

              <p>
                See the correct answer and explanation
                immediately after each response.
              </p>

            </div>


            <div className="step">

              <div className="step-number">
                04
              </div>

              <h3>
                Review your result
              </h3>

              <p>
                Finish the set and check your final
                correct and incorrect answers.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="cta-section">

        <div className="cta-container">

          <div className="cta-content">

            <span className="section-label">
              READY TO PRACTICE?
            </span>

            <h2>
              Your next interview starts with
              <span> better preparation.</span>
            </h2>

            <p>
              Choose a subject and start practicing
              today. No registration required.
            </p>

            <a
              href="#subjects"
              className="cta-button"
            >
              Start Practicing
              <span>→</span>
            </a>

          </div>

        </div>

      </section>


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-main">

            <div className="footer-brand">

              <div className="footer-logo">
                Interview<span>Prep</span>
              </div>

              <p>
                Practice today. Be ready tomorrow.
              </p>

            </div>


            <div className="footer-links">

              <a href="#subjects">
                Subjects
              </a>

              <a href="#how-it-works">
                How It Works
              </a>

            </div>

          </div>


          <div className="footer-bottom">

            <span>
              © {new Date().getFullYear()} InterviewPrep.
              All rights reserved.
            </span>

            <span>
              Built for better interview preparation.
            </span>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getNoteSubjects } from "../services/api";

import "./Notes.css";

import pythonIcon from "../assets/subject-icons/python.webp";
import sqlIcon from "../assets/subject-icons/sql.png";
import javascriptIcon from "../assets/subject-icons/js.webp";
import htmlIcon from "../assets/subject-icons/html.png";
import cssIcon from "../assets/subject-icons/css.webp";
import javaIcon from "../assets/subject-icons/java.webp";
import cIcon from "../assets/subject-icons/c.webp";
import cppIcon from "../assets/subject-icons/cpp.webp";
import cNIcon from "../assets/subject-icons/computer_network.png";
import gitHubIcon from "../assets/subject-icons/github.png";
import powerBiIcon from "../assets/subject-icons/powerBi.png";
import mongoDbIcon from "../assets/subject-icons/mongodb.png";
import dbmsIcon from "../assets/subject-icons/dbms.png";
import excelIcon from "../assets/subject-icons/excel.png";
import reactIcon from "../assets/subject-icons/react.png";
import nodejsIcon from "../assets/subject-icons/nodejs.png";
import computerIcon from "../assets/subject-icons/computer.png";
import analysisIcon from "../assets/subject-icons/analysis.png";
import englishIcon from "../assets/subject-icons/english.png";
import hrIcon from "../assets/subject-icons/interview.png";
import opIcon from "../assets/subject-icons/op.png";
import reasoningIcon from "../assets/subject-icons/reasoning.png";
import quantIcon from "../assets/subject-icons/quant.png";
import gaIcon from "../assets/subject-icons/ga.png";

const subjectIcons = {
  python: pythonIcon,
  sql: sqlIcon,
  javascript: javascriptIcon,
  html: htmlIcon,
  css: cssIcon,
  java: javaIcon,
  c: cIcon,
  cpp: cppIcon,
  "computer-networks": cNIcon,
  "git-github": gitHubIcon,
  "power-bi": powerBiIcon,
  mongodb: mongoDbIcon,
  dbms: dbmsIcon,
  excel: excelIcon,
  react: reactIcon,
  nodejs: nodejsIcon,
  "computer-awareness": computerIcon,
  "data-analytics": analysisIcon,
  english: englishIcon,
  "hr-interview": hrIcon,
  "operating-system": opIcon,
  reasoning: reasoningIcon,
  "quantitative-aptitude": quantIcon,
  "general-awareness": gaIcon,
};

function Notes() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getNoteSubjects();

      console.log("Notes API Response:", data);

      // API response handle
      if (Array.isArray(data)) {
        setSubjects(data);
      } else if (Array.isArray(data?.subjects)) {
        setSubjects(data.subjects);
      } else {
        setSubjects([]);
      }
    } catch (err) {
      console.error("Notes API Error:", err);

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load notes right now."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="notes-hero">
        <div className="notes-hero-glow notes-hero-glow-one"></div>
        <div className="notes-hero-glow notes-hero-glow-two"></div>

        <div className="notes-container">
          <div className="notes-hero-content">

            <div className="notes-badge">
              <span className="notes-badge-dot"></span>
              LEARN • REVISE • GROW
            </div>

            <h1>
              Learn with
              <span>Structured Notes</span>
            </h1>

            <p>
              Explore subject-wise notes, understand concepts,
              revise important topics, and prepare yourself
              for interviews and practical learning.
            </p>

          </div>
        </div>
      </section>

      {/* =========================================
          SUBJECTS
      ========================================= */}

      <section className="notes-subjects-section">

        <div className="notes-container">

          <div className="notes-section-header">

            <div>
              <span className="notes-section-label">
                STUDY MATERIAL
              </span>

              <h2>
                Choose a Subject
              </h2>

              <p>
                Select a subject to explore topic-wise notes.
              </p>
            </div>
{/* 
            {!loading && !error && (
              <div className="notes-total">
                <strong>{subjects.length}</strong>
                <span>Subjects</span>
              </div>
            )} */}

          </div>

          {/* =========================================
              LOADING
          ========================================= */}

          {loading && (
            <div className="notes-loading">
              <div className="notes-spinner"></div>
              <p>Loading notes...</p>
            </div>
          )}

          {/* =========================================
              ERROR
          ========================================= */}

          {!loading && error && (
            <div className="notes-error">

              <div className="notes-error-icon">
                !
              </div>

              <h3>
                Something went wrong
              </h3>

              <p>
                {error}
              </p>

              <button
                type="button"
                onClick={fetchNotes}
              >
                Try Again
              </button>

            </div>
          )}

          {/* =========================================
              EMPTY
          ========================================= */}

          {!loading &&
            !error &&
            subjects.length === 0 && (
              <div className="notes-empty">

                <div className="notes-empty-icon">
                  📚
                </div>

                <h3>
                  Notes are coming soon
                </h3>

                <p>
                  Study notes for different subjects
                  will be available here.
                </p>

              </div>
            )}

          {/* =========================================
              SUBJECTS
          ========================================= */}

          {!loading &&
            !error &&
            subjects.length > 0 && (

              <div className="notes-subject-grid">

                {subjects.map((subject) => (

                  <article
                    key={subject._id || subject.slug}
                    className="notes-subject-card"
                  >

                    <div className="notes-card-top">

                      <div className="notes-subject-icon">
                        {subjectIcons[subject.slug] ? (
    <img
      src={subjectIcons[subject.slug]}
      alt={`${subject.name} icon`}
      className="subject-icon-image"
    />
  ) : (
    subject.icon || "📚"
  )}
                      </div>



                    </div>

                    <div className="notes-card-content">

                      <h3>
                        {subject.name}
                      </h3>

                      <p>
                        {subject.description ||
                          `Learn ${subject.name} concepts with structured notes.`}
                      </p>

                      <button  onClick={() =>
                      navigate(`/notes/${subject.slug}`)
                    } className="learn_btn">Let's learn</button>

                    </div>

                    <div className="notes-card-bottom">

                     

                     

                    </div>

                  </article>

                ))}

              </div>

            )}

        </div>

      </section>

    </div>
  );
}

export default Notes;
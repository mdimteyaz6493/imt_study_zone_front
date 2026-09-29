import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getSubjects } from "../services/api";

import "./practice-sets.css";

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

function PracticeSets() {
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
      setError(err.message || "Unable to load practice sets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  /*
    TECHNICAL SUBJECTS
  */

  const technicalSlugs = [
    "python",
    "sql",
    "c",
    "cpp",
    "java",
    "javascript",
    "html",
    "css",
    "react",
    "nodejs",
    "mongodb",
    "dbms",
    "computer-networks",
    "operating-system",
    "git-github",
    "excel",
    "power-bi",
    "data-analytics",
  ];

  const technicalSubjects = subjects.filter((subject) =>
    technicalSlugs.includes(subject.slug),
  );

  /*
    OTHER / COMPETITIVE SUBJECTS
  */

  const competitiveSubjects = subjects.filter(
    (subject) => !technicalSlugs.includes(subject.slug),
  );

  return (
    <div className="practice-sets-page">
      {/* HEADER */}

      <section className="practice-sets-header">
        <div className="practice-sets-container">
          <span className="practice-sets-label">PRACTICE LIBRARY</span>

          <h1>All Practice Sets</h1>

          <p>
            Choose a subject and start practicing interview and competitive
            questions.
          </p>
        </div>
      </section>

      {/* CONTENT */}

      <section className="practice-sets-content">
        <div className="practice-sets-container">
          {/* LOADING */}

          {loading && <Loading text="Loading practice sets..." />}

          {/* ERROR */}

          {!loading && error && (
            <ErrorMessage message={error} onRetry={fetchSubjects} />
          )}

          {!loading && !error && (
            <div className="practice-category-grid">
              {/* TECHNICAL */}

              <div className="practice-category">
                <div className="category-header">
                  <div className="category-icon">💻</div>

                  <div>
                    <h2>Technical</h2>

                    <p>
                      Programming, development, database and technology
                      subjects.
                    </p>
                  </div>
                </div>

                <div className="practice-subject-list">
                  {technicalSubjects.map((subject) => (
                    <Link
                      key={subject._id}
                      to={`/subject/${subject.slug}`}
                      className="practice-subject-item"
                    >
                      <div className="practice-subject-icon">
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

                      <span>{subject.name}</span>
                      <p>Theory MCQ questions</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* COMPETITIVE / OTHER */}

              <div className="practice-category">
                <div className="category-header">
                  <div className="category-icon">🎯</div>

                  <div>
                    <h2>Competitive & Other</h2>

                    <p>
                      HR, aptitude and other interview preparation subjects.
                    </p>
                  </div>
                </div>

                <div className="practice-subject-list">
                  {competitiveSubjects.length > 0 ? (
                    competitiveSubjects.map((subject) => (
                      <Link
                        key={subject._id}
                        to={`/subject/${subject.slug}`}
                        className="practice-subject-item"
                      >
                        <div className="practice-subject-icon">
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

                        <span>{subject.name}</span>
                         <p>Theory MCQ questions</p>
                      </Link>
                    ))
                  ) : (
                    <div className="no-category-subjects">
                      More practice sets coming soon.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

export default PracticeSets;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getNoteSubjects } from "../services/api";

import "./Notes.css";

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
                    onClick={() =>
                      navigate(`/notes/${subject.slug}`)
                    }
                  >

                    <div className="notes-card-top">

                      <div className="notes-subject-icon">
                        {subject.icon ||
                          subject.name
                            ?.slice(0, 2)
                            .toUpperCase() ||
                          "📚"}
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
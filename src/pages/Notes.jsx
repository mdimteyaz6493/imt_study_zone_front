import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getNoteSubjects } from "../services/api";

import "./Notes.css";

function Notes() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getNoteSubjects();

        setSubjects(data.subjects || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load notes right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="notes-page">

      {/* HERO */}
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

      {/* SUBJECTS */}
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

            {!loading && !error && (
              <div className="notes-total">
                <strong>{subjects.length}</strong>
                <span>Subjects</span>
              </div>
            )}
          </div>

          {loading && (
            <div className="notes-loading">
              <div className="notes-spinner"></div>
              <p>Loading notes...</p>
            </div>
          )}

          {error && (
            <div className="notes-error">
              <div className="notes-error-icon">
                !
              </div>

              <h3>
                Something went wrong
              </h3>

              <p>{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          )}

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

          {!loading &&
            !error &&
            subjects.length > 0 && (
              <div className="notes-subject-grid">

                {subjects.map((subject) => (
                  <article
                    key={subject._id}
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
                            .toUpperCase()}
                      </div>

                      <span className="notes-card-arrow">
                        →
                      </span>

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

                      <div className="notes-topic-count">
                        <span>▤</span>

                        {subject.topicCount || 0}

                        <small>
                          Topics
                        </small>
                      </div>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          navigate(
                            `/notes/${subject.slug}`
                          );
                        }}
                      >
                        Explore Notes
                        <span>→</span>
                      </button>

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
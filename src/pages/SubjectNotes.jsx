import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getNotesBySubject,
  getNoteByTopic,
} from "../services/api";

import NotesSidebar from "../components/notes/NotesSidebar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import "./SubjectNotes.css";

function SubjectNotes() {
  const { subjectSlug, topicSlug } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState(null);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);

  const [loading, setLoading] = useState(true);
  const [noteLoading, setNoteLoading] = useState(false);
  const [error, setError] = useState("");

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // --------------------------------
  // LOAD SUBJECT NOTES
  // --------------------------------
  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getNotesBySubject(subjectSlug);

        setSubject(response.subject);
        setNotes(response.notes || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load notes.");
      } finally {
        setLoading(false);
      }
    };

    if (subjectSlug) {
      loadNotes();
    }
  }, [subjectSlug]);

  // --------------------------------
  // REDIRECT TO FIRST TOPIC
  // --------------------------------
  useEffect(() => {
    if (
      !loading &&
      notes.length > 0 &&
      !topicSlug
    ) {
      navigate(
        `/notes/${subjectSlug}/${notes[0].slug}`,
        { replace: true }
      );
    }
  }, [
    loading,
    notes,
    topicSlug,
    subjectSlug,
    navigate,
  ]);

  // --------------------------------
  // LOAD CURRENT TOPIC
  // --------------------------------
  useEffect(() => {
    const loadTopic = async () => {
      if (!topicSlug) return;

      try {
        setNoteLoading(true);

        const response = await getNoteByTopic(
          subjectSlug,
          topicSlug
        );

        setNote(response.note);
      } catch (err) {
        console.error(err);
        setError(
          err.message || "Failed to load this topic."
        );
      } finally {
        setNoteLoading(false);
      }
    };

    loadTopic();
  }, [subjectSlug, topicSlug]);

  // --------------------------------
  // CURRENT TOPIC INDEX
  // --------------------------------
  const currentIndex = useMemo(() => {
    return notes.findIndex(
      (item) => item.slug === topicSlug
    );
  }, [notes, topicSlug]);

  const previousNote =
    currentIndex > 0
      ? notes[currentIndex - 1]
      : null;

  const nextNote =
    currentIndex >= 0 &&
    currentIndex < notes.length - 1
      ? notes[currentIndex + 1]
      : null;

  // --------------------------------
  // TOPIC NAVIGATION
  // --------------------------------
  const openTopic = (slug) => {
    navigate(
      `/notes/${subjectSlug}/${slug}`
    );

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const handlePrevious = () => {
    if (previousNote) {
      openTopic(previousNote.slug);
    }
  };

  const handleNext = () => {
    if (nextNote) {
      openTopic(nextNote.slug);
    }
  };

  // --------------------------------
  // LOADING
  // --------------------------------
  if (loading) {
    return <Loading />;
  }

  // --------------------------------
  // ERROR
  // --------------------------------
  if (error && !note) {
    return <ErrorMessage message={error} />;
  }

  // --------------------------------
  // EMPTY
  // --------------------------------
  if (!notes.length) {
    return (
      <div className="subject-notes-empty">
        <div>
          <span className="empty-icon">📚</span>

          <h2>No Notes Available</h2>

          <p>
            Notes for this subject are not available
            yet.
          </p>

          <button
            onClick={() => navigate("/notes")}
          >
            ← Back to Notes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="subject-notes-page">

      {/* =========================================
          FIXED TOP BAR
      ========================================= */}
      <header className="notes-topbar">

        <div className="notes-topbar-left">

          <button
            className="mobile-topics-button"
            onClick={() =>
              setMobileSidebarOpen(true)
            }
            type="button"
          >
            ☰
            <span>Topics</span>
          </button>

          <button
            className="notes-back-button"
            onClick={() => navigate("/notes")}
            type="button"
          >
            ←
            <span>All Notes</span>
          </button>

          <div className="notes-topbar-divider"></div>

        </div>

        <div className="notes-topbar-right">

          {currentIndex >= 0 && (
            <span className="topic-counter">
              Topic {currentIndex + 1} / {notes.length}
            </span>
          )}

        </div>

      </header>

      {/* =========================================
          MAIN NOTES LAYOUT
      ========================================= */}
      <div className="notes-layout">

        {/* LEFT SIDEBAR */}
        <NotesSidebar
          subject={subject}
          notes={notes}
          mobileOpen={mobileSidebarOpen}
          onClose={() =>
            setMobileSidebarOpen(false)
          }
        />

        {/* RIGHT CONTENT */}
        <main className="notes-main-content">

          {noteLoading ? (
            <div className="topic-loading">
              <Loading />
            </div>
          ) : note ? (
            <article className="notes-article">

              {/* Topic Header */}
              <div className="notes-article-header">

                <div className="notes-topic-label">
                  {currentIndex >= 0
                    ? `TOPIC ${String(
                        currentIndex + 1
                      ).padStart(2, "0")}`
                    : "TOPIC"}
                </div>

                <h1>{note.title}</h1>

                {note.description && (
                  <p>
                    {note.description}
                  </p>
                )}

              </div>

              {/* Content */}
              <div className="notes-content">

                {note.content?.sections?.map(
                  (section, index) => {

                    switch (section.type) {

                      case "heading":
                        return (
                          <section
                            className="note-section"
                            key={index}
                          >
                            <h2>
                              {section.heading}
                            </h2>
                          </section>
                        );

                      case "paragraph":
                        return (
                          <p
                            className="note-paragraph"
                            key={index}
                          >
                            {section.text}
                          </p>
                        );

                      case "list":
                        return (
                          <div
                            className="note-list-section"
                            key={index}
                          >
                            {section.heading && (
                              <h3>
                                {section.heading}
                              </h3>
                            )}

                            <ul>
                              {section.items?.map(
                                (item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                  >
                                    {item}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        );

                      case "code":
                        return (
                          <div
                            className="note-code-block"
                            key={index}
                          >
                            <div className="note-code-header">
                              <span>
                                {section.language ||
                                  "Code"}
                              </span>

                              <span>
                                CODE
                              </span>
                            </div>

                            <pre>
                              <code>
                                {section.code}
                              </code>
                            </pre>
                          </div>
                        );

                      case "table":
                        return (
                          <div
                            className="note-table-wrapper"
                            key={index}
                          >
                            <table>
                              <thead>
                                <tr>
                                  {section.headers?.map(
                                    (
                                      header,
                                      headerIndex
                                    ) => (
                                      <th
                                        key={
                                          headerIndex
                                        }
                                      >
                                        {header}
                                      </th>
                                    )
                                  )}
                                </tr>
                              </thead>

                              <tbody>
                                {section.rows?.map(
                                  (
                                    row,
                                    rowIndex
                                  ) => (
                                    <tr
                                      key={rowIndex}
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
                                            {cell}
                                          </td>
                                        )
                                      )}
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        );

                      case "important":
                        return (
                          <div
                            className="note-important"
                            key={index}
                          >
                            <div className="note-important-icon">
                              !
                            </div>

                            <div>
                              <h3>
                                {section.title ||
                                  "Important"}
                              </h3>

                              <p>
                                {section.text}
                              </p>
                            </div>
                          </div>
                        );

                      default:
                        return null;
                    }
                  }
                )}

              </div>

              {/* Previous / Next */}
              <div className="notes-navigation">

                <button
                  type="button"
                  className={`notes-nav-card ${
                    !previousNote
                      ? "disabled"
                      : ""
                  }`}
                  onClick={handlePrevious}
                  disabled={!previousNote}
                >
                  <span className="notes-nav-label">
                    ← Previous
                  </span>

                  <strong>
                    {previousNote
                      ? previousNote.title
                      : "No previous topic"}
                  </strong>
                </button>

                <button
                  type="button"
                  className={`notes-nav-card next ${
                    !nextNote
                      ? "disabled"
                      : ""
                  }`}
                  onClick={handleNext}
                  disabled={!nextNote}
                >
                  <span className="notes-nav-label">
                    Next →
                  </span>

                  <strong>
                    {nextNote
                      ? nextNote.title
                      : "No next topic"}
                  </strong>
                </button>

              </div>

              {/* Practice CTA */}
              <div className="notes-practice-cta">

                <div>
                  <span className="cta-label">
                    READY TO PRACTICE?
                  </span>

                  <h2>
                    Test your {subject?.name} knowledge
                  </h2>

                  <p>
                    Practice interview questions and
                    check your answers instantly.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/practice/${subjectSlug}`
                    )
                  }
                >
                  Start Practice →
                </button>

              </div>

            </article>
          ) : null}

        </main>

      </div>

    </div>
  );
}

export default SubjectNotes;
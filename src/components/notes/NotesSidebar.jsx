import { NavLink } from "react-router-dom";

import "./NotesSidebar.css";

function NotesSidebar({
  subject,
  notes,
  mobileOpen,
  onClose,
}) {
  return (
    <>
      {mobileOpen && (
        <div
          className="notes-sidebar-overlay"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`notes-sidebar ${
          mobileOpen ? "notes-sidebar-mobile-open" : ""
        }`}
      >

        <div className="notes-sidebar-header">

          <div className="notes-sidebar-subject">

            <div className="notes-sidebar-icon">
              {subject?.icon ||
                subject?.name?.slice(0, 2).toUpperCase()}
            </div>

            <div>
              <span>NOTES</span>
              <h3>{subject?.name}</h3>
            </div>

          </div>

          <button
            type="button"
            className="notes-sidebar-close"
            onClick={onClose}
            aria-label="Close notes menu"
          >
            ×
          </button>

        </div>

        <div className="notes-sidebar-divider"></div>

        <div className="notes-sidebar-title">
          <span>TOPICS</span>
          <strong>{notes.length}</strong>
        </div>

        <nav className="notes-topic-list">

          {notes.map((note, index) => (
            <NavLink
              key={note._id}
              to={`/notes/${subject.slug}/${note.slug}`}
              onClick={onClose}
              className={({ isActive }) =>
                `notes-topic-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <span className="notes-topic-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="notes-topic-name">
                {note.title}
              </span>

            </NavLink>
          ))}

        </nav>

      </aside>
    </>
  );
}

export default NotesSidebar;
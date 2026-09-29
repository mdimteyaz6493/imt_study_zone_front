import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiArrowDownSLine, RiSearchLine, RiCloseLine } from "react-icons/ri";
import { getSubjects, getNoteSubjects } from "../services/api";

import "./navbar.css";

const TECHNICAL_SLUGS = [
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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [noteSubjects, setNoteSubjects] = useState([]);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  /* =========================================================
     LOAD SUBJECTS + NOTE SUBJECTS
  ========================================================= */

  useEffect(() => {
    const loadNavbarData = async () => {
      try {
        const [subjectData, noteData] = await Promise.all([
          getSubjects(),
          getNoteSubjects(),
        ]);

        setSubjects(subjectData?.subjects || []);

        setNoteSubjects(noteData?.subjects || []);
      } catch (error) {
        console.error("Failed to load navbar data:", error);

        // Subjects ko independently load karne ki fallback
        try {
          const subjectData = await getSubjects();
          setSubjects(subjectData?.subjects || []);
        } catch (subjectError) {
          console.error("Failed to load subjects:", subjectError);
        }
      }
    };

    loadNavbarData();
  }, []);

  /* =========================================================
     CLOSE SEARCH ON ROUTE CHANGE
  ========================================================= */

  useEffect(() => {
    setSearchOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  /* =========================================================
     FOCUS MOBILE SEARCH INPUT
  ========================================================= */

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [searchOpen]);

  /* =========================================================
     CLOSE MENU
  ========================================================= */

  const closeMenu = () => {
    setMenuOpen(false);
    setPracticeOpen(false);
  };

  /* =========================================================
     SUBJECTS
  ========================================================= */

  const goToSubjects = () => {
    closeMenu();

    if (location.pathname === "/") {
      document.getElementById("subjects")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      navigate("/");

      setTimeout(() => {
        document.getElementById("subjects")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const technicalSubjects = subjects.filter((subject) =>
    TECHNICAL_SLUGS.includes(subject.slug)
  );

  const competitiveSubjects = subjects.filter(
    (subject) => !TECHNICAL_SLUGS.includes(subject.slug)
  );

  const isPracticePage = location.pathname === "/practice-sets";

  /* =========================================================
     SEARCH
  ========================================================= */

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchResults =
    normalizedQuery.length > 0
      ? subjects.filter((subject) => {
          const name = subject.name?.toLowerCase() || "";
          const slug = subject.slug?.toLowerCase() || "";

          return (
            name.includes(normalizedQuery) ||
            slug.includes(normalizedQuery)
          );
        })
      : [];

  /* =========================================================
     CHECK WHETHER SUBJECT HAS NOTES
  ========================================================= */

  const hasNotes = (subject) => {
    return noteSubjects.some(
      (noteSubject) =>
        noteSubject.slug === subject.slug ||
        noteSubject._id === subject._id
    );
  };

  /* =========================================================
     SEARCH RESULT CLICK
  ========================================================= */

  const openPractice = (slug) => {
    setSearchOpen(false);
    setSearchQuery("");
    closeMenu();

    navigate(`/subject/${slug}`);
  };

  const openNotes = (slug) => {
    setSearchOpen(false);
    setSearchQuery("");
    closeMenu();

    navigate(`/notes/${slug}`);
  };

  /* =========================================================
     SEARCH INPUT
  ========================================================= */

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  const closeSearch = () => {
    setSearchQuery("");
    setSearchOpen(false);
  };

  /* =========================================================
     SEARCH RESULTS COMPONENT
  ========================================================= */

  const SearchResults = ({ mobile = false }) => {
    if (!searchOpen || !normalizedQuery) {
      return null;
    }

    return (
      <div
        className={`navbar-search-results ${
          mobile ? "mobile-search-results" : ""
        }`}
      >
        {searchResults.length > 0 ? (
          <>
            <div className="search-results-title">
              Search results
            </div>

            {searchResults.map((subject) => {
              const subjectHasNotes = hasNotes(subject);

              return (
                <div
                  className="search-result-subject"
                  key={subject._id}
                >
                  {/* Practice Set */}
                  <button
                    type="button"
                    className="search-result-item"
                    onClick={() => openPractice(subject.slug)}
                  >
                    <span className="search-result-icon practice-icon">
                      📝
                    </span>

                    <span className="search-result-content">
                      <strong>
                        {subject.name} Practice Set
                      </strong>

                      <small>
                        Practice questions and MCQs
                      </small>
                    </span>

                    <span className="search-result-arrow">
                      →
                    </span>
                  </button>

                  {/* Notes - only if available */}
                  {subjectHasNotes && (
                    <button
                      type="button"
                      className="search-result-item"
                      onClick={() => openNotes(subject.slug)}
                    >
                      <span className="search-result-icon notes-icon">
                        📖
                      </span>

                      <span className="search-result-content">
                        <strong>
                          {subject.name} Notes
                        </strong>

                        <small>
                          Topic-wise study notes
                        </small>
                      </span>

                      <span className="search-result-arrow">
                        →
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <div className="search-no-results">
            <div className="search-no-results-icon">
              🔍
            </div>

            <div>
              <strong>No results found</strong>
              <span>
                Try another subject name
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* =====================================================
            LOGO
        ===================================================== */}

        {!searchOpen && (
          <Link
            to="/"
            className="navbar-logo"
            onClick={closeMenu}
          >
            <span className="logo-icon">
              <img
                src="/icon.jpg"
                alt="IMT Study Zone"
              />
            </span>

            <span className="logo-text">
              <span>IMT </span>STUDY ZONE
            </span>
          </Link>
        )}

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav className="navbar-menu">

          <Link
            to="/"
            className={`nav-link ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/notes"
            className={`nav-link ${
              location.pathname === "/notes" ? "active" : ""
            }`}
          >
            Notes
          </Link>

          <button
            type="button"
            className="nav-link nav-button"
            onClick={goToSubjects}
          >
            Subjects
          </button>

          {/* =================================================
              PRACTICE SETS
          ================================================= */}

          <div
            className={`practice-dropdown-wrapper ${
              isPracticePage ? "active" : ""
            } ${practiceOpen ? "open" : ""}`}
            onMouseEnter={() => setPracticeOpen(true)}
            onMouseLeave={() => setPracticeOpen(false)}
          >
            <button
              type="button"
              className="nav-link practice-dropdown-trigger"
              onClick={() =>
                setPracticeOpen(!practiceOpen)
              }
            >
              Practice Sets

              <span className="dropdown-arrow">
                <RiArrowDownSLine />
              </span>
            </button>

            <div className="practice-dropdown-menu">

              {/* Technical */}
              <div className="practice-dropdown-column">
                <div className="practice-dropdown-heading">
                  Technical
                </div>

                <div className="dropdown_practice-subject-list">
                  {technicalSubjects.map((subject) => (
                    <Link
                      key={subject._id}
                      to={`/subject/${subject.slug}`}
                      className="practice-subject-link"
                      onClick={closeMenu}
                    >
                      {subject.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Competitive */}
              <div className="practice-dropdown-column">
                <div className="practice-dropdown-heading">
                  Competitive
                </div>

                <div className="dropdown_practice-subject-list">
                  {competitiveSubjects.map((subject) => (
                    <Link
                      key={subject._id}
                      to={`/subject/${subject.slug}`}
                      className="practice-subject-link"
                      onClick={closeMenu}
                    >
                      {subject.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* All Practice Sets */}
              <Link
                to="/practice-sets"
                className="practice-all-subjects"
                onClick={closeMenu}
              >
                View All Practice Sets
                <span>→</span>
              </Link>

            </div>
          </div>
        </nav>

        {/* =====================================================
            DESKTOP SEARCH
        ===================================================== */}

        <div className="navbar-search desktop-search">

          <div className="navbar-search-input-wrapper">

            <RiSearchLine className="navbar-search-icon" />

            <input
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onFocus={() => setSearchOpen(true)}
              onChange={handleSearchChange}
            />

            {searchQuery && (
              <button
                type="button"
                className="navbar-search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <RiCloseLine />
              </button>
            )}

          </div>

          <SearchResults />
        </div>

        {/* =====================================================
            MOBILE SEARCH BUTTON
        ===================================================== */}

        {!searchOpen && (
          <button
            type="button"
            className="mobile-search-button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <RiSearchLine />
          </button>
        )}

        {/* =====================================================
            MOBILE SEARCH BAR
        ===================================================== */}

        {searchOpen && (
          <div className="mobile-search-container">

            <div className="navbar-search-input-wrapper">

              <RiSearchLine className="navbar-search-icon" />

              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={handleSearchChange}
              />

              {searchQuery && (
                <button
                  type="button"
                  className="navbar-search-clear"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <RiCloseLine />
                </button>
              )}

            </div>

            <button
              type="button"
              className="mobile-search-close"
              onClick={closeSearch}
              aria-label="Close search"
            >
              <RiCloseLine />
            </button>

            <SearchResults mobile />
          </div>
        )}

        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}

        {!searchOpen && (
          <button
            className={`mobile-menu-button ${
              menuOpen ? "open" : ""
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

      </div>

      {/* =======================================================
          MOBILE NAVIGATION
      ======================================================= */}

      <div
        className={`mobile-menu ${
          menuOpen && !searchOpen ? "show" : ""
        }`}
      >

        <Link
          to="/"
          className={`mobile-nav-link ${
            location.pathname === "/" ? "active" : ""
          }`}
          onClick={closeMenu}
        >
          <span>⌂</span>
          Home
        </Link>

        <Link
          to="/notes"
          className={`mobile-nav-link ${
            location.pathname === "/notes" ? "active" : ""
          }`}
          onClick={closeMenu}
        >
          <span>📝</span>
          Notes
        </Link>

        <button
          type="button"
          className="mobile-nav-link"
          onClick={goToSubjects}
        >
          <span>📚</span>
          Subjects
        </button>

        {/* Mobile Practice Sets */}

        <button
          type="button"
          className={`mobile-nav-link mobile-practice-toggle ${
            isPracticePage ? "active" : ""
          }`}
          onClick={() =>
            setPracticeOpen(!practiceOpen)
          }
        >
          <span>🎯</span>

          <span className="mobile-practice-title">
            Practice Sets
          </span>

          <span
            className={`mobile-dropdown-arrow ${
              practiceOpen ? "rotate" : ""
            }`}
          >
            <RiArrowDownSLine />
          </span>
        </button>

        {/* Mobile Practice Menu */}

        <div
          className={`mobile-practice-menu ${
            practiceOpen ? "show" : ""
          }`}
        >

          <div className="mobile-practice-group">

            <div className="mobile-practice-heading">
              Technical
            </div>

            {technicalSubjects.map((subject) => (
              <Link
                key={subject._id}
                to={`/subject/${subject.slug}`}
                className="mobile-practice-subject"
                onClick={closeMenu}
              >
                {subject.name}
              </Link>
            ))}

          </div>

          <div className="mobile-practice-group">

            <div className="mobile-practice-heading">
              Competitive
            </div>

            {competitiveSubjects.map((subject) => (
              <Link
                key={subject._id}
                to={`/subject/${subject.slug}`}
                className="mobile-practice-subject"
                onClick={closeMenu}
              >
                {subject.name}
              </Link>
            ))}

          </div>

          <Link
            to="/practice-sets"
            className="mobile-all-subjects"
            onClick={closeMenu}
          >
            View All Practice Sets
            <span>→</span>
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;
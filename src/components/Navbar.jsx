import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSubjects } from "../services/api";
import { RiArrowDownSLine } from "react-icons/ri";


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

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data?.subjects || []);
      } catch (error) {
        console.error("Failed to load subjects:", error);
      }
    };

    loadSubjects();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setPracticeOpen(false);
  };

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

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <span className="logo-icon">
            <img src="/icon.jpg" alt="IMT Study Zone" />
          </span>

          <span className="logo-text">
            <span>IMT </span>STUDY ZONE
          </span>
        </Link>

        {/* Desktop Navigation */}
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

          {/* Practice Sets */}
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
              onClick={() => setPracticeOpen(!practiceOpen)}
            >
              Practice Sets
              <span className="dropdown-arrow"><RiArrowDownSLine/></span>
            </button>

            <div className="practice-dropdown-menu">

              {/* Technical */}
              <div className="practice-dropdown-column">
                <div className="practice-dropdown-heading">
                  Technical
                </div>

                <div className="practice-subject-list">
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

                <div className="practice-subject-list">
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

              {/* All Subjects */}
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

        {/* Desktop CTA */}
        {/* <button
          className="navbar-cta"
          onClick={goToSubjects}
        >
          Start Practice
          <span>→</span>
        </button> */}

        {/* Mobile Menu Button */}
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
      </div>

      {/* Mobile Navigation */}
      <div
        className={`mobile-menu ${
          menuOpen ? "show" : ""
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
          onClick={() => setPracticeOpen(!practiceOpen)}
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

        {/* Mobile Subjects */}
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

        {/* Start Practice */}
        {/* <button
          type="button"
          className="mobile-start-button"
          onClick={goToSubjects}
        >
          Start Practice
          <span>→</span>
        </button> */}

      </div>
    </header>
  );
};

export default Navbar;
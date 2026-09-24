import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const goToSubjects = () => {
    closeMenu();

    if (location.pathname === "/") {
      document
        .getElementById("subjects")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    } else {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById("subjects")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <span className="logo-icon"><img src="icon.jpg" alt="" /></span>

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

        </nav>

        {/* Desktop CTA */}
        <button
          className="navbar-cta"
          onClick={goToSubjects}
        >
          Start Practice
          <span>→</span>
        </button>

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

        <button
          type="button"
          className="mobile-nav-link"
          onClick={goToSubjects}
        >
          <span>📚</span>
          Subjects
        </button>

        <Link
          to="/subject/sql"
          className={`mobile-nav-link ${
            location.pathname === "/subject/sql" ||
            location.pathname === "/practical/sql"
              ? "active"
              : ""
          }`}
          onClick={closeMenu}
        >
          <span>💻</span>
          SQL Practice
        </Link>

        <button
          type="button"
          className="mobile-start-button"
          onClick={goToSubjects}
        >
          Start Practice
          <span>→</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;


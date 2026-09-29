import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Code2, ArrowUp } from "lucide-react";

import "./FloatingActions.css";

function FloatingActions() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Check if current page is Coding page
  const isCodingPage = location.pathname === "/coding";

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openCoding = () => {
    navigate("/coding");
  };

  return (
    <div className="floating-actions">

      {/* Coding Button */}
      {!isCodingPage && (
        <button
          className="floating-btn coding-btn"
          onClick={openCoding}
          aria-label="Open Coding"
          title="Coding"
        >
          <Code2 size={21} strokeWidth={2.2} />
          <span className="floating-tooltip">
            Coding
          </span>
        </button>
      )}

      {/* Scroll To Top */}
      <button
        className={`floating-btn scroll-top-btn ${
          showScrollTop ? "visible" : ""
        }`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <ArrowUp size={21} strokeWidth={2.4} />

        <span className="floating-tooltip">
          Back to top
        </span>
      </button>

    </div>
  );
}

export default FloatingActions;
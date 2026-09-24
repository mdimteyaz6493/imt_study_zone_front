import { useNavigate } from "react-router-dom";
import "./SubjectCard.css";

function SubjectCard({ subject }) {
  const navigate = useNavigate();

  const handlePractice = () => {
    navigate(`/subject/${subject.slug}`);
  };

  return (
    <div className="subject-card">

      {/* TOP */}
      <div className="subject-card-top">

        <div className="subject-icon">
          {subject.icon || subject.name?.slice(0, 2).toUpperCase()}
        </div>

      </div>


      {/* CONTENT */}
      <div className="subject-card-content">

        <h3>
          {subject.name}
        </h3>

        <p>
          {subject.description ||
            `Practice ${subject.name} interview questions and improve your knowledge.`}
        </p>

      </div>


      {/* INFO */}
      <div className="subject-card-info">

        <span>
          50 Questions
        </span>

        <span>
          MCQ
        </span>

      </div>


      {/* BUTTON */}
      <button
        type="button"
        className="subject-practice-button"
        onClick={handlePractice}
      >
        <span>
          Start Practice
        </span>

        <span className="subject-button-arrow">
          →
        </span>
      </button>

    </div>
  );
}

export default SubjectCard;
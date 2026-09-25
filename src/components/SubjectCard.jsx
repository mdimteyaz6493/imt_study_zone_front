import { Link } from "react-router-dom";
import "./subjectCard.css";

function SubjectCard({ subject }) {
  return (
    <Link
      to={`/subject/${subject.slug}`}
      className="subject-card"
    >
      <div className="subject-card-icon">
        {subject.icon || "📚"}
      </div>

      <h3>{subject.name}</h3>


    </Link>
  );
}

export default SubjectCard;
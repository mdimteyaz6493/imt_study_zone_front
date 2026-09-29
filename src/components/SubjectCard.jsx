import { Link } from "react-router-dom";
import "./subjectCard.css";

import pythonIcon from "../assets/subject-icons/python.webp";
import sqlIcon from "../assets/subject-icons/sql.png";
import javascriptIcon from "../assets/subject-icons/js.webp";
import htmlIcon from "../assets/subject-icons/html.png";
import cssIcon from "../assets/subject-icons/css.webp";
import javaIcon from "../assets/subject-icons/java.webp";
import cIcon from "../assets/subject-icons/c.webp";
import cppIcon from "../assets/subject-icons/cpp.webp";
import cNIcon from "../assets/subject-icons/computer_network.png";
import gitHubIcon from "../assets/subject-icons/github.png";
import powerBiIcon from "../assets/subject-icons/powerBi.png";
import mongoDbIcon from "../assets/subject-icons/mongodb.png";
import dbmsIcon from "../assets/subject-icons/dbms.png";
import excelIcon from "../assets/subject-icons/excel.png";
import reactIcon from "../assets/subject-icons/react.png";
import nodejsIcon from "../assets/subject-icons/nodejs.png";
import computerIcon from "../assets/subject-icons/computer.png";
import analysisIcon from "../assets/subject-icons/analysis.png";
import englishIcon from "../assets/subject-icons/english.png";
import hrIcon from "../assets/subject-icons/interview.png";
import opIcon from "../assets/subject-icons/op.png";
import reasoningIcon from "../assets/subject-icons/reasoning.png";
import quantIcon from "../assets/subject-icons/quant.png";
import gaIcon from "../assets/subject-icons/ga.png";


const subjectIcons = {
  python: pythonIcon,
  sql: sqlIcon,
  javascript: javascriptIcon,
  html: htmlIcon,
  css: cssIcon,
  java: javaIcon,
  c: cIcon,
  cpp: cppIcon,
  "computer-networks":cNIcon,
  "git-github":gitHubIcon,
  "power-bi":powerBiIcon,
  mongodb:mongoDbIcon,
  dbms:dbmsIcon,
  excel:excelIcon,
  react:reactIcon,
  nodejs:nodejsIcon,
  "computer-awareness":computerIcon,
  "data-analytics":analysisIcon,
  english:englishIcon,
  "hr-interview":hrIcon,
  "operating-system":opIcon,
  reasoning:reasoningIcon,
  "quantitative-aptitude":quantIcon,
  "general-awareness":gaIcon
};

function SubjectCard({ subject }) {
  const realIcon = subjectIcons[subject.slug];

  return (
    <Link
      to={`/subject/${subject.slug}`}
      className="subject-card"
    >
      <div className="subject-card-icon">
        {realIcon ? (
          <img
            src={realIcon}
            alt={`${subject.name} icon`}
            className="subject-icon-image"
            style={{height:"100%"}}
          />
        ) : (
          subject.icon || "📚"
        )}
      </div>

      <h3>{subject.name}</h3>
      <p>Theory MCQ questions</p>
    </Link>
  );
}

export default SubjectCard;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getSubjects } from "../services/api";

import "./practice-sets.css";


function PracticeSets() {

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchSubjects = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getSubjects();

      setSubjects(data.subjects || []);

    } catch (err) {

      setError(
        err.message || "Unable to load practice sets"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    fetchSubjects();
  }, []);


  /*
    TECHNICAL SUBJECTS
  */

  const technicalSlugs = [
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
    "data-analytics"
  ];


  const technicalSubjects = subjects.filter(
    (subject) =>
      technicalSlugs.includes(subject.slug)
  );


  /*
    OTHER / COMPETITIVE SUBJECTS
  */

  const competitiveSubjects = subjects.filter(
    (subject) =>
      !technicalSlugs.includes(subject.slug)
  );


  return (

    <div className="practice-sets-page">

      {/* HEADER */}

      <section className="practice-sets-header">

        <div className="practice-sets-container">

          <span className="practice-sets-label">
            PRACTICE LIBRARY
          </span>

          <h1>
            All Practice Sets
          </h1>

          <p>
            Choose a subject and start practicing
            interview and competitive questions.
          </p>

        </div>

      </section>


      {/* CONTENT */}

      <section className="practice-sets-content">

        <div className="practice-sets-container">


          {/* LOADING */}

          {loading && (
            <Loading text="Loading practice sets..." />
          )}


          {/* ERROR */}

          {!loading && error && (
            <ErrorMessage
              message={error}
              onRetry={fetchSubjects}
            />
          )}


          {!loading && !error && (

            <div className="practice-category-grid">


              {/* TECHNICAL */}

              <div className="practice-category">

                <div className="category-header">

                  <div className="category-icon">
                    💻
                  </div>

                  <div>
                    <h2>
                      Technical
                    </h2>

                    <p>
                      Programming, development,
                      database and technology subjects.
                    </p>
                  </div>

                </div>


                <div className="practice-subject-list">

                  {technicalSubjects.map((subject) => (

                    <Link
                      key={subject._id}
                      to={`/subject/${subject.slug}`}
                      className="practice-subject-item"
                    >

                      <div className="practice-subject-icon">
                        {subject.icon || "📚"}
                      </div>

                      <span>
                        {subject.name}
                      </span>

          

                    </Link>

                  ))}

                </div>

              </div>


              {/* COMPETITIVE / OTHER */}

              <div className="practice-category">

                <div className="category-header">

                  <div className="category-icon">
                    🎯
                  </div>

                  <div>
                    <h2>
                      Competitive & Other
                    </h2>

                    <p>
                      HR, aptitude and other
                      interview preparation subjects.
                    </p>

                  </div>

                </div>


                <div className="practice-subject-list">

                  {competitiveSubjects.length > 0 ? (

                    competitiveSubjects.map((subject) => (

                      <Link
                        key={subject._id}
                        to={`/subject/${subject.slug}`}
                        className="practice-subject-item"
                      >

                        <div className="practice-subject-icon">
                          {subject.icon || "📚"}
                        </div>

                        <span>
                          {subject.name}
                        </span>

                    

                      </Link>

                    ))

                  ) : (

                    <div className="no-category-subjects">
                      More practice sets coming soon.
                    </div>

                  )}

                </div>

              </div>


            </div>

          )}


          {/* ALL SUBJECT BUTTON */}

          {!loading &&
            !error &&
            subjects.length > 0 && (

              <div className="all-subjects-wrapper">

                <Link
                  to="/practice-sets"
                  className="all-subjects-button"
                >
                  View All Subjects
                  <span>→</span>
                </Link>

              </div>

            )}

        </div>

      </section>

    </div>

  );
}


export default PracticeSets;
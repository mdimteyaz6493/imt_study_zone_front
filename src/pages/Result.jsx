import { Link, useLocation } from "react-router-dom";


function Result() {

  const location = useLocation();

  const data = location.state;


  /*
  |--------------------------------------------------------------------------
  | NO RESULT DATA
  |--------------------------------------------------------------------------
  */

  if (!data) {

    return (
      <div className="result-page">

        <div className="result-card">

          <h1>
            No Result Found
          </h1>

          <p>
            Please start a practice session first.
          </p>

          <Link
            to="/"
            className="result-button"
          >
            Choose Subject
          </Link>

        </div>

      </div>
    );

  }


  const total = data.total || 0;

  const correct = data.correct || 0;

  const incorrect = data.incorrect || 0;


  const percentage =
    total > 0
      ? Math.round(
          (correct / total) * 100
        )
      : 0;


  return (
    <div className="result-page">

      <div className="result-container">

        <div className="result-icon">
          ✓
        </div>


        <span className="result-label">
          PRACTICE COMPLETE
        </span>


        <h1>
          Great job!
        </h1>


        <p className="result-subtitle">

          You completed your{" "}

          <strong>
            {data.subject?.name}
          </strong>{" "}

          practice session.

        </p>


        {/* SCORE */}

        <div className="score-card">

          <div className="score-circle">

            <strong>
              {percentage}%
            </strong>

            <span>
              Score
            </span>

          </div>


          <div className="score-main">

            <span>
              Your Score
            </span>

            <strong>
              {correct}{" "}
              <small>
                / {total}
              </small>
            </strong>

          </div>

        </div>


        {/* STATS */}

        <div className="result-stats">

          <div className="result-stat">

            <span className="stat-icon correct-icon">
              ✓
            </span>

            <div>
              <strong>
                {correct}
              </strong>

              <span>
                Correct
              </span>
            </div>

          </div>


          <div className="result-stat">

            <span className="stat-icon wrong-icon">
              ✕
            </span>

            <div>
              <strong>
                {incorrect}
              </strong>

              <span>
                Incorrect
              </span>
            </div>

          </div>


          <div className="result-stat">

            <span className="stat-icon total-icon">
              #
            </span>

            <div>
              <strong>
                {total}
              </strong>

              <span>
                Total
              </span>
            </div>

          </div>

        </div>


        {/* ACTIONS */}

        <div className="result-actions">

          <Link
            to={`/practice/${data.subject?.slug}`}
            className="result-button primary"
          >
            Practice Again
            <span>↻</span>
          </Link>


          <Link
            to="/"
            className="result-button secondary"
          >
            Choose Another Subject
            <span>→</span>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Result;
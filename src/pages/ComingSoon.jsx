import "./ComingSoon.css";

function ComingSoon() {
  return (
    <section className="coming-soon">
      <div className="coming-soon-glow coming-soon-glow-1"></div>
      <div className="coming-soon-glow coming-soon-glow-2"></div>

      <div className="coming-soon-content">

        <div className="coming-soon-icon">
          <span>📚</span>
        </div>

        <div className="coming-soon-badge">
          <span></span>
          COMING SOON
        </div>

        <h1>
          Notes are
          <span>Coming Soon</span>
        </h1>

        <p>
          We are working on useful and well-organized study notes
          to help you learn concepts faster and prepare better.
        </p>

        <div className="coming-soon-features">
          <div className="coming-soon-feature">
            <span>✓</span>
            <p>Easy to understand notes</p>
          </div>

          <div className="coming-soon-feature">
            <span>✓</span>
            <p>Topic-wise learning material</p>
          </div>

          <div className="coming-soon-feature">
            <span>✓</span>
            <p>Useful for interview preparation</p>
          </div>
        </div>

        <div className="coming-soon-line">
          <span></span>
          <p>IMT STUDY ZONE</p>
          <span></span>
        </div>

      </div>
    </section>
  );
}

export default ComingSoon;
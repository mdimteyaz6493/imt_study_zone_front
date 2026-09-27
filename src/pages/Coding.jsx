
import CodeEditor from "../components/CodeEditor";
import "./Coding.css";

function Coding() {
  return (
    <main className="coding-page">
      <div className="coding-container">

        {/* Page Header */}
        <div className="coding-heading">
          <h1>Coding Practice</h1>

          <p>
            Write HTML, CSS and JavaScript code
            and see your result instantly.
          </p>
        </div>

        {/* Editor Workspace */}
        <section className="coding-workspace">
          <CodeEditor />
        </section>

      </div>
    </main>
  );
}

export default Coding;


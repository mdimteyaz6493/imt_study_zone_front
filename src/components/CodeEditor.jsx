import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { autocompletion, completeFromList } from "@codemirror/autocomplete";

import {
  FiPlay,
  FiRotateCcw,
  FiTrash2,
  FiCopy,
  FiDownload,
  FiMaximize2,
  FiMinimize2,
  FiTerminal,
  FiSun,
  FiMoon,
} from "react-icons/fi";

import "./CodeEditor.css";

/* =========================================================
   DEFAULT CODE
========================================================= */

const DEFAULT_HTML = `<div class="container">
<h1>Hello World</h1>
<p>Welcome to IMT STUDY ZONE</p>
</div>`;

const DEFAULT_CSS = `
.container{
  padding:20px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
}
h1 {
  color: #2563eb;
  font-size:3rem;
}
p{
  font-size:1.2rem;
  margin-top:-20px
}`;

const DEFAULT_JS = ``;

/* =========================================================
   LOCAL STORAGE CODE
========================================================= */

const STORAGE_KEYS = {
  html: "code-editor-html",
  css: "code-editor-css",
  js: "code-editor-js",
};

const getSavedCode = (key, defaultValue) => {
  const savedCode = localStorage.getItem(key);

  // null = first visit
  // "" = user intentionally cleared the code
  return savedCode !== null ? savedCode : defaultValue;
};

/* =========================================================
   HTML TAG COMPLETIONS
========================================================= */

const HTML_TAGS = [
  "html",
  "head",
  "body",
  "title",
  "meta",
  "link",
  "style",
  "script",
  "header",
  "nav",
  "main",
  "section",
  "article",
  "aside",
  "footer",
  "div",
  "span",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "a",
  "img",
  "button",
  "input",
  "textarea",
  "select",
  "option",
  "label",
  "form",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "ul",
  "ol",
  "li",
  "br",
  "hr",
  "strong",
  "b",
  "em",
  "i",
  "small",
  "mark",
  "del",
  "ins",
  "sub",
  "sup",
  "blockquote",
  "pre",
  "code",
  "video",
  "audio",
  "source",
  "iframe",
  "canvas",
  "figure",
  "figcaption",
];

/* =========================================================
   HTML ABBREVIATIONS
========================================================= */

const HTML_ABBREVIATIONS = [
  {
    label: "div",
    type: "keyword",
    apply: "<div></div>",
  },
  {
    label: "h1",
    type: "keyword",
    apply: "<h1></h1>",
  },
  {
    label: "h2",
    type: "keyword",
    apply: "<h2></h2>",
  },
  {
    label: "h3",
    type: "keyword",
    apply: "<h3></h3>",
  },
  {
    label: "h4",
    type: "keyword",
    apply: "<h4></h4>",
  },
  {
    label: "h5",
    type: "keyword",
    apply: "<h5></h5>",
  },
  {
    label: "h6",
    type: "keyword",
    apply: "<h6></h6>",
  },
  {
    label: "p",
    type: "keyword",
    apply: "<p></p>",
  },
  {
    label: "span",
    type: "keyword",
    apply: "<span></span>",
  },
  {
    label: "section",
    type: "keyword",
    apply: "<section></section>",
  },
  {
    label: "article",
    type: "keyword",
    apply: "<article></article>",
  },
  {
    label: "header",
    type: "keyword",
    apply: "<header></header>",
  },
  {
    label: "footer",
    type: "keyword",
    apply: "<footer></footer>",
  },
  {
    label: "nav",
    type: "keyword",
    apply: "<nav></nav>",
  },
  {
    label: "main",
    type: "keyword",
    apply: "<main></main>",
  },
  {
    label: "button",
    type: "keyword",
    apply: "<button></button>",
  },
  {
    label: "form",
    type: "keyword",
    apply: "<form></form>",
  },
  {
    label: "label",
    type: "keyword",
    apply: "<label></label>",
  },
  {
    label: "textarea",
    type: "keyword",
    apply: "<textarea></textarea>",
  },
  {
    label: "ul",
    type: "keyword",
    apply: "<ul>\n  <li></li>\n</ul>",
  },
  {
    label: "ol",
    type: "keyword",
    apply: "<ol>\n  <li></li>\n</ol>",
  },
  {
    label: "li",
    type: "keyword",
    apply: "<li></li>",
  },
  {
    label: "a",
    type: "keyword",
    apply: '<a href=""></a>',
  },
  {
    label: "img",
    type: "keyword",
    apply: '<img src="" alt="">',
  },
  {
    label: "input",
    type: "keyword",
    apply: '<input type="text">',
  },
  {
    label: "table",
    type: "keyword",
    apply: "<table>\n  <tr>\n    <td></td>\n  </tr>\n</table>",
  },
  {
    label: "strong",
    type: "keyword",
    apply: "<strong></strong>",
  },
  {
    label: "em",
    type: "keyword",
    apply: "<em></em>",
  },
  {
    label: "blockquote",
    type: "keyword",
    apply: "<blockquote></blockquote>",
  },
  {
    label: "code",
    type: "keyword",
    apply: "<code></code>",
  },
];

/* =========================================================
   CSS COMPLETIONS
========================================================= */

const CSS_PROPERTIES = [
  "color",
  "background",
  "background-color",
  "font-size",
  "font-family",
  "font-weight",
  "font-style",
  "text-align",
  "text-decoration",
  "line-height",
  "letter-spacing",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "width",
  "height",
  "max-width",
  "max-height",
  "min-width",
  "min-height",
  "display",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "z-index",
  "flex",
  "flex-direction",
  "justify-content",
  "align-items",
  "align-content",
  "flex-wrap",
  "gap",
  "grid",
  "grid-template-columns",
  "grid-template-rows",
  "border",
  "border-radius",
  "box-shadow",
  "opacity",
  "overflow",
  "cursor",
  "transition",
  "transform",
  "object-fit",
];

/* =========================================================
   JAVASCRIPT COMPLETIONS
========================================================= */

const JS_COMPLETIONS = [
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "switch",
  "case",
  "break",
  "continue",
  "class",
  "new",
  "try",
  "catch",
  "finally",
  "throw",
  "async",
  "await",
  "import",
  "export",
  "console",
  "document",
  "window",
  "alert",
  "prompt",
  "setTimeout",
  "setInterval",
  "Math",
  "JSON",
  "Array",
  "Object",
  "String",
  "Number",
  "Boolean",
  "Date",
  "Promise",
];

/* =========================================================
   PREVIEW DOCUMENT
========================================================= */

function createPreviewDocument(htmlCode, cssCode, jsCode) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <style>
    ${cssCode}
  </style>
</head>

<body>

  ${htmlCode}

  <script>
    (() => {
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;

      const sendConsoleMessage = (type, args) => {
        window.parent.postMessage(
          {
            source: "live-code-editor",
            type,
            args: args.map((arg) => {
              try {
                if (typeof arg === "object") {
                  return JSON.stringify(arg, null, 2);
                }

                return String(arg);
              } catch {
                return String(arg);
              }
            }),
          },
          "*"
        );
      };

      console.log = (...args) => {
        originalLog(...args);
        sendConsoleMessage("log", args);
      };

      console.error = (...args) => {
        originalError(...args);
        sendConsoleMessage("error", args);
      };

      console.warn = (...args) => {
        originalWarn(...args);
        sendConsoleMessage("warn", args);
      };

      window.onerror = (message, source, lineno, colno) => {
        sendConsoleMessage("error", [
          message + " (line " + lineno + ")",
        ]);
      };
    })();

    try {
      ${jsCode}
    } catch (error) {
      console.error(error.message);
    }
  </script>

</body>
</html>
`;
}

function createDownloadDocument(htmlCode, cssCode, jsCode) {
  const scriptPart = jsCode.trim()
    ? `
  <script>
    ${jsCode}
  </script>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <style>
${cssCode}
  </style>
</head>

<body>

${htmlCode}
${scriptPart}

</body>
</html>`;
}

/* =========================================================
   COMPONENT
========================================================= */

function CodeEditor() {
  const [activeTab, setActiveTab] = useState("html");

  const [htmlCode, setHtmlCode] = useState(() =>
  getSavedCode(STORAGE_KEYS.html, DEFAULT_HTML)
);

const [cssCode, setCssCode] = useState(() =>
  getSavedCode(STORAGE_KEYS.css, DEFAULT_CSS)
);

const [jsCode, setJsCode] = useState(() =>
  getSavedCode(STORAGE_KEYS.js, DEFAULT_JS)
);

  // const [previewCode, setPreviewCode] = useState("");
  const [previewCode, setPreviewCode] = useState(() => 
  createPreviewDocument(htmlCode, cssCode, jsCode)
);

  const [consoleLogs, setConsoleLogs] = useState([]);

  const [editorTheme, setEditorTheme] = useState(() => {
    return localStorage.getItem("code-editor-theme") || "dark";
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  // 50/50 by default. Desktop users can drag the divider.
  const [splitPercent, setSplitPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // CodeMirror font size. Ctrl + mouse wheel changes it.
  const [fontSize, setFontSize] = useState(() => {
    const saved = Number(localStorage.getItem("code-editor-font-size"));
    return Number.isFinite(saved)
      ? Math.min(24, Math.max(12, saved))
      : 14;
  });

  // On mobile fullscreen, switch between Editor and Output.
  const [mobileFullscreenView, setMobileFullscreenView] = useState("editor");

  // Preview / Console are tabs inside the output panel.
  const [outputTab, setOutputTab] = useState("preview");



// Code change hone par preview automatically sync rakhne ke liye:
useEffect(() => {
  setPreviewCode(
    createPreviewDocument(
      htmlCode,
      cssCode,
      jsCode
    )
  );
}, [htmlCode, cssCode, jsCode]);

  /* =====================================================
     THEME
  ===================================================== */

  useEffect(() => {
    localStorage.setItem("code-editor-theme", editorTheme);
  }, [editorTheme]);

  /* =====================================================
     FONT SIZE PERSISTENCE
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      "code-editor-font-size",
      String(fontSize)
    );
  }, [fontSize]);

  /* =====================================================
   CODE PERSISTENCE
===================================================== */

useEffect(() => {
  localStorage.setItem(
    STORAGE_KEYS.html,
    htmlCode
  );
}, [htmlCode]);

useEffect(() => {
  localStorage.setItem(
    STORAGE_KEYS.css,
    cssCode
  );
}, [cssCode]);

useEffect(() => {
  localStorage.setItem(
    STORAGE_KEYS.js,
    jsCode
  );
}, [jsCode]);

  /* =====================================================
     FULLSCREEN BODY SCROLL LOCK
  ===================================================== */

  useEffect(() => {
    if (!isFullscreen) return;

    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow =
        previousHtmlOverflow;
    };
  }, [isFullscreen]);

  /* =====================================================
     FULLSCREEN ESC
  ===================================================== */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  /* =====================================================
     KEYBOARD SHORTCUTS
  ===================================================== */

  useEffect(() => {
    const handleKeyboardShortcuts = (event) => {
      // Ctrl + Enter / Cmd + Enter -> Run Code
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter"
      ) {
        event.preventDefault();
        runCode();
        return;
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyboardShortcuts
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboardShortcuts
      );
    };
  }, [htmlCode, cssCode, jsCode]);

  /* =====================================================
     CTRL + MOUSE WHEEL -> FONT SIZE
  ===================================================== */

  useEffect(() => {
    const handleEditorWheel = (event) => {
      if (!event.ctrlKey && !event.metaKey) return;

      const editorElement =
        event.target.closest(".code-mirror-container");

      if (!editorElement) return;

      event.preventDefault();

      setFontSize((current) => {
        const next =
          event.deltaY < 0
            ? current + 1
            : current - 1;

        return Math.min(24, Math.max(12, next));
      });
    };

    document.addEventListener(
      "wheel",
      handleEditorWheel,
      { passive: false }
    );

    return () => {
      document.removeEventListener(
        "wheel",
        handleEditorWheel
      );
    };
  }, []);

  /* =====================================================
     RESIZABLE SPLIT
  ===================================================== */

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (event) => {
      const workspace = document.querySelector(".editor-preview-workspace");
      if (!workspace) return;

      const rect = workspace.getBoundingClientRect();
      const percent = ((event.clientX - rect.left) / rect.width) * 100;

      setSplitPercent(Math.min(75, Math.max(25, percent)));
    };

    const stopDragging = () => {
      setIsDragging(false);
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", stopDragging);

    document.body.classList.add("code-editor-resizing");

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", stopDragging);
      document.body.classList.remove("code-editor-resizing");
    };
  }, [isDragging]);

  /* =====================================================
     RUN CODE
  ===================================================== */

 const runCode = () => {
  setConsoleLogs([]);

  setPreviewCode(
    createPreviewDocument(
      htmlCode,
      cssCode,
      jsCode
    )
  );

  setOutputTab("preview");
};

 

  /* =====================================================
     CONSOLE MESSAGE
  ===================================================== */

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.data &&
        event.data.source === "live-code-editor"
      ) {
        setConsoleLogs((prev) => [
          ...prev,
          {
            type: event.data.type,
            args: event.data.args,
          },
        ]);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  /* =====================================================
     RESET
  ===================================================== */

 const resetCode = () => {
  setHtmlCode(DEFAULT_HTML);
  setCssCode(DEFAULT_CSS);
  setJsCode(DEFAULT_JS);

  localStorage.setItem(
    STORAGE_KEYS.html,
    DEFAULT_HTML
  );

  localStorage.setItem(
    STORAGE_KEYS.css,
    DEFAULT_CSS
  );

  localStorage.setItem(
    STORAGE_KEYS.js,
    DEFAULT_JS
  );

  setConsoleLogs([]);

  setPreviewCode(
    createPreviewDocument(
      DEFAULT_HTML,
      DEFAULT_CSS,
      DEFAULT_JS
    )
  );

  setOutputTab("preview");
};

  /* =====================================================
     CLEAR
  ===================================================== */

  const clearCode = () => {
  setHtmlCode("");
  setCssCode("");
  setJsCode("");

  localStorage.setItem(
    STORAGE_KEYS.html,
    ""
  );

  localStorage.setItem(
    STORAGE_KEYS.css,
    ""
  );

  localStorage.setItem(
    STORAGE_KEYS.js,
    ""
  );

  setConsoleLogs([]);

  setPreviewCode(
    createPreviewDocument("", "", "")
  );

  setOutputTab("preview");
};

  /* =====================================================
     COPY
  ===================================================== */

  const copyCode = async () => {
    const completeCode =
      createDownloadDocument(
        htmlCode,
        cssCode,
        jsCode
      );

    try {
      await navigator.clipboard.writeText(completeCode);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  /* =====================================================
     DOWNLOAD
  ===================================================== */

  const downloadCode = () => {
    const completeCode =
      createDownloadDocument(
        htmlCode,
        cssCode,
        jsCode
      );

    const blob = new Blob(
      [completeCode],
      {
        type: "text/html",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "index.html";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =====================================================
     COMPLETIONS
  ===================================================== */

  const htmlCompletion =
    completeFromList(
      HTML_ABBREVIATIONS
    );

  const cssCompletion =
    completeFromList(
      CSS_PROPERTIES.map((property) => ({
        label: property,
        type: "property",
      }))
    );

  const jsCompletion =
    completeFromList(
      JS_COMPLETIONS.map((item) => ({
        label: item,
        type: "keyword",
      }))
    );

  /* =====================================================
     EDITOR
  ===================================================== */

  const renderEditor = () => {
    let languageExtension;
    let customCompletion;

    if (activeTab === "html") {
      languageExtension = html({
        autoCloseTags: true,
      });

      customCompletion = htmlCompletion;
    }

    if (activeTab === "css") {
      languageExtension = css();
      customCompletion = cssCompletion;
    }

    if (activeTab === "js") {
      languageExtension = javascript();
      customCompletion = jsCompletion;
    }

    const currentCode =
      activeTab === "html"
        ? htmlCode
        : activeTab === "css"
        ? cssCode
        : jsCode;

    const setCode =
      activeTab === "html"
        ? setHtmlCode
        : activeTab === "css"
        ? setCssCode
        : setJsCode;

    return (
      <CodeMirror
        value={currentCode}
        height="100%"
        style={{
    fontSize: `${fontSize}px`,
    height: "100%", // <-- CRITICAL FIX: Direct wrapper style height
    overflow: "hidden", // <-- Outer wrapper ko expand hone se rokega
  }}
        theme={
          editorTheme === "dark"
            ? oneDark
            : undefined
        }
        extensions={[
          languageExtension,
          autocompletion({
            override: [customCompletion],
            activateOnTyping: true,
            closeOnBlur: false,
          }),
        ]}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
        }}
        onChange={(value) => {
          setCode(value);
        }}
      />
    );
  };

  /* =====================================================
     TOOLTIP HELPER
  ===================================================== */

  const actionButtonProps = (label) => ({
    "aria-label": label,
    "data-tooltip": label,
  });

  /* =====================================================
     JSX
  ===================================================== */

  return (
    <div
      className={`code-editor-wrapper ${
        editorTheme === "dark"
          ? "theme-dark"
          : "theme-light"
      } ${
        isFullscreen
          ? "code-editor-fullscreen"
          : ""
      }`}
    >
      {/* =================================================
          TOP TOOLBAR
      ================================================= */}

      <header className="editor-header">
        <div className="editor-title">
          <div className="editor-title-icon">
            {"</>"}
          </div>

          <div className="editor-title-copy">
            <h2>Code Editor</h2>
            <span>HTML • CSS • JavaScript</span>
          </div>

          <div className="mobile-fullscreen-switcher">
            <button
              className={
                mobileFullscreenView === "editor"
                  ? "mobile-view-btn active"
                  : "mobile-view-btn"
              }
              onClick={() =>
                setMobileFullscreenView("editor")
              }
            >
              Editor
            </button>

            <button
              className={
                mobileFullscreenView === "output"
                  ? "mobile-view-btn active"
                  : "mobile-view-btn"
              }
              onClick={() =>
                setMobileFullscreenView("output")
              }
            >
              Preview
            </button>
          </div>
        </div>

        <div className="editor-actions">
          <button
            className="editor-action-btn run-btn"
            onClick={runCode}
            {...actionButtonProps("Run Code")}
          >
            <FiPlay />
            <span>Run</span>
          </button>

          <button
            className="editor-action-btn"
            onClick={() =>
              setEditorTheme((prev) =>
                prev === "dark"
                  ? "light"
                  : "dark"
              )
            }
            {...actionButtonProps(
              editorTheme === "dark"
                ? "Light Theme"
                : "Dark Theme"
            )}
          >
            {editorTheme === "dark" ? (
              <FiSun />
            ) : (
              <FiMoon />
            )}
          </button>

          <button
            className="editor-action-btn"
            onClick={resetCode}
            {...actionButtonProps("Reset Code")}
          >
            <FiRotateCcw />
          </button>

          <button
            className="editor-action-btn"
            onClick={clearCode}
            {...actionButtonProps("Clear Code")}
          >
            <FiTrash2 />
          </button>

          <button
            className="editor-action-btn"
            onClick={copyCode}
            {...actionButtonProps(
              copied ? "Copied" : "Copy Code"
            )}
          >
            <FiCopy />
          </button>

          <button
            className="editor-action-btn"
            onClick={downloadCode}
            {...actionButtonProps("Download HTML")}
          >
            <FiDownload />
          </button>

          <button
            className="editor-action-btn"
            onClick={() => {
              setIsFullscreen((prev) => {
                const next = !prev;

                if (next) {
                  setMobileFullscreenView("editor");
                }

                return next;
              });
            }}
            {...actionButtonProps(
              isFullscreen
                ? "Exit Fullscreen"
                : "Fullscreen"
            )}
          >
            {isFullscreen ? (
              <FiMinimize2 />
            ) : (
              <FiMaximize2 />
            )}
          </button>
        </div>
      </header>

      {/* =================================================
          EDITOR + OUTPUT
      ================================================= */}

      <div
        className={`editor-preview-workspace ${
          mobileFullscreenView === "output"
            ? "mobile-show-output"
            : "mobile-show-editor"
        }`}
        style={{
          "--editor-split": `${splitPercent}%`,
        }}
      >
        {/* =================================================
            EDITOR PANEL
        ================================================= */}

        <section className="editor-panel">
          <div className="editor-panel-top">
            <div className="panel-heading">
              <span className="panel-label">Editor</span>
              <span className="panel-subtitle">
                Write your code
              </span>
            </div>

            <span className="panel-hint">
              {activeTab.toUpperCase()} · {fontSize}px
            </span>
          </div>

          <div className="editor-tabs">
            <button
              className={
                activeTab === "html"
                  ? "editor-tab active html-tab"
                  : "editor-tab html-tab"
              }
              onClick={() => setActiveTab("html")}
            >
              <span className="tab-icon">HTML</span>
            </button>

            <button
              className={
                activeTab === "css"
                  ? "editor-tab active css-tab"
                  : "editor-tab css-tab"
              }
              onClick={() => setActiveTab("css")}
            >
              <span className="tab-icon">CSS</span>
            </button>

            <button
              className={
                activeTab === "js"
                  ? "editor-tab active js-tab"
                  : "editor-tab js-tab"
              }
              onClick={() => setActiveTab("js")}
            >
              <span className="tab-icon">JS</span>
            </button>
          </div>

          <div className="code-mirror-container">
            {renderEditor()}
          </div>
        </section>

        {/* =================================================
            RESIZE HANDLE
        ================================================= */}

        <div
          className={`workspace-divider ${
            isDragging ? "dragging" : ""
          }`}
          onPointerDown={(event) => {
            if (window.innerWidth <= 700) return;

            event.preventDefault();
            event.currentTarget.setPointerCapture?.(
              event.pointerId
            );
            setIsDragging(true);
          }}
          role="separator"
          aria-label="Resize editor and preview"
          aria-orientation="vertical"
        >
          <span className="divider-grip">
            <i></i>
            <i></i>
            <i></i>
          </span>
        </div>

        {/* =================================================
            OUTPUT PANEL
        ================================================= */}

        <section className="preview-panel">
          <div className="output-header">
            <div className="output-tabs">
              <button
                className={`output-tab ${
                  outputTab === "preview"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setOutputTab("preview")
                }
              >
                <span className="output-tab-icon">
                  ▣
                </span>
                Preview
              </button>

              <button
                className={`output-tab ${
                  outputTab === "console"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setOutputTab("console")
                }
              >
                <FiTerminal />
                Console
                {consoleLogs.length > 0 && (
                  <span className="console-count">
                    {consoleLogs.length}
                  </span>
                )}
              </button>
            </div>

            {outputTab === "preview" ? (
              <div className="preview-status">
                <span className="status-dot"></span>
                Ready
              </div>
            ) : (
              <button
                className="console-clear-btn"
                onClick={() =>
                  setConsoleLogs([])
                }
                disabled={consoleLogs.length === 0}
              >
                Clear
              </button>
            )}
          </div>

          {outputTab === "preview" ? (
            <div className="preview-container">
              <iframe
                title="Code Preview"
                srcDoc={previewCode}
                sandbox="allow-scripts allow-modals"
              />
            </div>
          ) : (
            <div className="console-container">
              <div className="console-body">
                {consoleLogs.length === 0 ? (
                  <div className="console-empty">
                    <FiTerminal />
                    <strong>No console output</strong>
                    <span>
                      Run your JavaScript code to see
                      console messages here.
                    </span>
                  </div>
                ) : (
                  consoleLogs.map(
                    (log, index) => (
                      <div
                        className={`console-line console-${log.type}`}
                        key={index}
                      >
                        <span className="console-type">
                          {log.type}
                        </span>

                        <span className="console-message">
                          {log.args.join(" ")}
                        </span>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CodeEditor;

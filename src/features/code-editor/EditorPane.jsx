import { useEffect, useRef } from "react";

const MONACO_LOADER_ID = "monaco-loader";

const loadMonaco = () =>
  new Promise((resolve, reject) => {
    if (window.monaco?.editor) {
      resolve(window.monaco);
      return;
    }

    const existing = document.getElementById(MONACO_LOADER_ID);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.monaco));
      existing.addEventListener("error", reject);
      return;
    }

    const loader = document.createElement("script");
    loader.id = MONACO_LOADER_ID;
    loader.src = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs/loader.min.js";
    loader.async = true;
    loader.onload = () => {
      window.require.config({
        paths: {
          vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs",
        },
      });
      window.require(["vs/editor/editor.main"], () => resolve(window.monaco));
    };
    loader.onerror = reject;
    document.body.appendChild(loader);
  });

export const EditorPane = ({ value, language, onChange, isDarkMode }) => {
  const containerRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    loadMonaco()
      .then((monaco) => {
        if (!mounted || !containerRef.current) {
          return;
        }

        editorRef.current = monaco.editor.create(containerRef.current, {
          value,
          language,
          automaticLayout: true,
          minimap: { enabled: false },
          smoothScrolling: true,
          fontSize: 14,
          fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
          padding: { top: 14 },
          theme: isDarkMode ? "vs-dark" : "vs",
          scrollBeyondLastLine: false,
          lineNumbersMinChars: 3,
          roundedSelection: true,
          wordWrap: "on",
        });

        editorRef.current.onDidChangeModelContent(() => {
          onChange(editorRef.current.getValue());
        });
      })
      .catch(() => {});

    return () => {
      mounted = false;
      editorRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }

    const model = editor.getModel();
    if (!model) {
      return;
    }

    const currentLanguage = model.getLanguageId();
    if (currentLanguage !== language && window.monaco?.editor) {
      window.monaco.editor.setModelLanguage(model, language);
    }

    if (editor.getValue() !== value) {
      editor.setValue(value);
    }

    window.monaco?.editor.setTheme(isDarkMode ? "vs-dark" : "vs");
  }, [value, language, isDarkMode]);

  return <div ref={containerRef} className="h-full min-h-[320px] w-full overflow-hidden rounded-2xl border border-white/10" />;
};

import { useEffect, useRef } from "react";

const MONACO_LOADER_ID = "monaco-loader";

const getMonacoLanguage = (language) => {
  if (language === "javascript") return "javascript";
  if (language === "python") return "python";
  if (language === "php") return "php";
  if (language === "css") return "css";
  if (language === "html") return "html";
  return "plaintext";
};

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

export const EditorPane = ({ activeFile, onChange, theme }) => {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const modelMapRef = useRef(new Map());
  const monacoRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    loadMonaco().then((monaco) => {
      if (!mounted || !containerRef.current) return;
      monacoRef.current = monaco;

      editorRef.current = monaco.editor.create(containerRef.current, {
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14,
        scrollBeyondLastLine: false,
        tabCompletion: "on",
        quickSuggestions: true,
        theme: theme === "dark" ? "vs-dark" : "vs",
        padding: { top: 8 },
      });

      editorRef.current.onDidChangeModelContent(() => {
        if (activeFile) {
          onChange(editorRef.current.getValue());
        }
      });
    });

    return () => {
      mounted = false;
      editorRef.current?.dispose();
      modelMapRef.current.forEach((model) => model.dispose());
      modelMapRef.current.clear();
    };
  }, []);

  useEffect(() => {
    if (!activeFile || !editorRef.current || !monacoRef.current) return;

    const monaco = monacoRef.current;
    const language = getMonacoLanguage(activeFile.language);
    let model = modelMapRef.current.get(activeFile.id);

    if (!model) {
      model = monaco.editor.createModel(activeFile.content || "", language);
      modelMapRef.current.set(activeFile.id, model);
    }

    if (model.getValue() !== (activeFile.content || "")) {
      model.setValue(activeFile.content || "");
    }

    monaco.editor.setModelLanguage(model, language);
    editorRef.current.setModel(model);
    editorRef.current.setPosition({ lineNumber: 1, column: 1 });
    monaco.editor.setTheme(theme === "dark" ? "vs-dark" : "vs");
  }, [activeFile, theme]);

  return <div ref={containerRef} className="h-full w-full" />;
};

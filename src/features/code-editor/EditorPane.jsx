import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

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

export const EditorPane = forwardRef(function EditorPane({ activeFile, onChange, isDarkMode }, ref) {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const modelsRef = useRef(new Map());

  useImperativeHandle(ref, () => ({
    undo: () => editorRef.current?.trigger("toolbar", "undo", null),
    redo: () => editorRef.current?.trigger("toolbar", "redo", null),
  }));

  useEffect(() => {
    let mounted = true;

    loadMonaco()
      .then((monaco) => {
        if (!mounted || !containerRef.current || !activeFile) {
          return;
        }

        monacoRef.current = monaco;
        const model = monaco.editor.createModel(activeFile.content, activeFile.monacoLanguage);
        modelsRef.current.set(activeFile.id, model);

        editorRef.current = monaco.editor.create(containerRef.current, {
          model,
          automaticLayout: true,
          minimap: { enabled: false },
          smoothScrolling: true,
          fontSize: 14,
          fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
          padding: { top: 10 },
          theme: isDarkMode ? "vs-dark" : "vs",
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          wordBasedSuggestions: "allDocuments",
          tabCompletion: "on",
          autoIndent: "full",
          bracketPairColorization: { enabled: true },
        });

        editorRef.current.setPosition({ lineNumber: 1, column: 1 });

        editorRef.current.onDidChangeModelContent(() => {
          const currentFile = editorRef.current?.getModel()?.id;
          if (!currentFile) {
            return;
          }
          onChange(editorRef.current.getValue());
        });
      })
      .catch(() => {});

    return () => {
      mounted = false;
      editorRef.current?.dispose();
      modelsRef.current.forEach((model) => model.dispose());
      modelsRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;

    if (!editor || !monaco || !activeFile) {
      return;
    }

    let model = modelsRef.current.get(activeFile.id);

    if (!model) {
      model = monaco.editor.createModel(activeFile.content, activeFile.monacoLanguage);
      modelsRef.current.set(activeFile.id, model);
    }

    if (model.getLanguageId() !== activeFile.monacoLanguage) {
      monaco.editor.setModelLanguage(model, activeFile.monacoLanguage);
    }

    if (model.getValue() !== activeFile.content) {
      model.setValue(activeFile.content);
    }

    if (editor.getModel() !== model) {
      editor.setModel(model);
      editor.setPosition({ lineNumber: 1, column: 1 });
    }

    monaco.editor.setTheme(isDarkMode ? "vs-dark" : "vs");
  }, [activeFile, isDarkMode]);

  return <div ref={containerRef} className="h-full min-h-[360px] w-full overflow-hidden rounded-2xl border border-white/10" />;
});

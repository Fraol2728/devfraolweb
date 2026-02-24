import { useEffect, useRef } from "react";
import type { FileNode } from "@/features/code-editor/types";

declare global {
  interface Window { monaco: any; require: any; __pyodide?: any; loadPyodide?: any; }
}

const loaderId = "monaco-loader-cdn";

const load = () => new Promise<any>((resolve, reject) => {
  if (window.monaco?.editor) return resolve(window.monaco);
  const existing = document.getElementById(loaderId) as HTMLScriptElement | null;
  if (existing) {
    existing.addEventListener("load", () => resolve(window.monaco));
    existing.addEventListener("error", reject);
    return;
  }
  const script = document.createElement("script");
  script.id = loaderId;
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs/loader.min.js";
  script.onload = () => {
    window.require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs" } });
    window.require(["vs/editor/editor.main"], () => resolve(window.monaco));
  };
  script.onerror = reject;
  document.body.appendChild(script);
});

const MonacoFromCDN = ({
  file,
  onChange,
  onEditorReady,
}: {
  file: FileNode;
  onChange: (value: string) => void;
  onEditorReady?: (editor: any) => void;
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const modelRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    load().then((monaco) => {
      if (!mounted || !mountRef.current) return;
      monacoRef.current = monaco;

      monaco.languages.registerCompletionItemProvider("python", {
        provideCompletionItems: () => ({
          suggestions: [
            { label: "print", kind: monaco.languages.CompletionItemKind.Function, insertText: "print(${1:value})", insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet },
            { label: "def", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "def ${1:name}(${2:args}):\n    ${3:pass}", insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet },
            { label: "for", kind: monaco.languages.CompletionItemKind.Snippet, insertText: "for ${1:item} in ${2:items}:\n    ${3:pass}", insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet },
          ],
        }),
      });

      editorRef.current = monaco.editor.create(mountRef.current, {
        value: file.content ?? "",
        language: file.language ?? "plaintext",
        theme: "vs-dark",
        minimap: { enabled: false },
        automaticLayout: true,
        lineNumbers: "on",
        autoIndent: "full",
        tabSize: 4,
        insertSpaces: true,
        detectIndentation: false,
      });
      modelRef.current = editorRef.current.getModel();

      editorRef.current.onDidChangeModelContent(() => {
        onChange(editorRef.current.getValue());
      });

      onEditorReady?.(editorRef.current);
    });
    return () => { mounted = false; editorRef.current?.dispose(); };
  }, []);

  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    const model = editorRef.current.getModel();
    modelRef.current = model;
    monacoRef.current.editor.setModelLanguage(model, file.language ?? "plaintext");
    if (editorRef.current.getValue() !== (file.content ?? "")) {
      editorRef.current.setValue(file.content ?? "");
    }
  }, [file]);

  useEffect(() => {
    if (!modelRef.current || file.language !== "python") return;
    const value = file.content ?? "";
    const runLint = async () => {
      try {
        if (!window.__pyodide) return;
        window.__pyodide.globals.set("__code_to_check", value);
        await window.__pyodide.runPythonAsync(`
import ast
try:
    ast.parse(__code_to_check)
    __lint_error = None
except SyntaxError as exc:
    __lint_error = (exc.lineno or 1, exc.offset or 1, str(exc.msg))
`);
        const lintError = window.__pyodide.globals.get("__lint_error");
        if (!lintError) {
          monacoRef.current.editor.setModelMarkers(modelRef.current, "python-lint", []);
          return;
        }
        const [line, col, msg] = lintError.toJs ? lintError.toJs() : lintError;
        monacoRef.current.editor.setModelMarkers(modelRef.current, "python-lint", [{
          startLineNumber: line,
          endLineNumber: line,
          startColumn: col,
          endColumn: col + 1,
          message: msg,
          severity: monacoRef.current.MarkerSeverity.Error,
        }]);
      } catch {
        // ignore lint when runtime is unavailable
      }
    };
    const timer = window.setTimeout(runLint, 300);
    return () => window.clearTimeout(timer);
  }, [file.content, file.language]);

  return <div className="ce-editor" ref={mountRef} />;
};

export default MonacoFromCDN;

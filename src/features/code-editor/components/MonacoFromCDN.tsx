import { useEffect, useRef } from "react";
import type { FileNode } from "@/features/code-editor/types";

declare global {
  interface Window { monaco: any; require: any; }
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

const MonacoFromCDN = ({ file, onChange }: { file: FileNode; onChange: (value: string) => void }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    load().then((monaco) => {
      if (!mounted || !mountRef.current) return;
      monacoRef.current = monaco;
      editorRef.current = monaco.editor.create(mountRef.current, {
        value: file.content ?? "",
        language: file.language ?? "plaintext",
        theme: "vs-dark",
        minimap: { enabled: false },
        automaticLayout: true,
      });
      editorRef.current.onDidChangeModelContent(() => onChange(editorRef.current.getValue()));
    });
    return () => { mounted = false; editorRef.current?.dispose(); };
  }, []);

  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    const model = editorRef.current.getModel();
    monacoRef.current.editor.setModelLanguage(model, file.language ?? "plaintext");
    if (editorRef.current.getValue() !== (file.content ?? "")) editorRef.current.setValue(file.content ?? "");
  }, [file]);

  return <div className="ce-editor" ref={mountRef} />;
};

export default MonacoFromCDN;

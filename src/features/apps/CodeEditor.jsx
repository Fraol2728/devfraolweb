import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Play, Save, Sun } from "lucide-react";
import { toast } from "@/hooks/useToastStore";

const snippets = {
  JavaScript: "console.log('Hello from JavaScript');",
  Python: "print('Hello from Python')",
  C: "#include <stdio.h>\nint main(){ printf(\"Hello C\\n\"); return 0; }",
  "C++": "#include <iostream>\nint main(){ std::cout << \"Hello C++\\n\"; }",
  Java: "class Main { public static void main(String[] args){ System.out.println(\"Hello Java\"); }}",
};

const backendLanguageMap = {
  Python: "python",
  C: "c",
  "C++": "cpp",
  Java: "java",
};

export const CodeEditor = ({ endpoints }) => {
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState(snippets.JavaScript);
  const [output, setOutput] = useState("");
  const [isDarkEditor, setIsDarkEditor] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const lineCount = useMemo(() => code.split("\n").length, [code]);

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
    setCode(snippets[nextLanguage]);
    setOutput("");
  };

  const handleRun = async () => {
    if (!code.trim()) {
      toast({ title: "Code is empty", description: "Please enter some code first.", variant: "destructive" });
      return;
    }

    setIsRunning(true);
    try {
      if (language === "JavaScript") {
        const result = Function(`"use strict"; ${code}`)();
        setOutput(result !== undefined ? String(result) : "JavaScript executed successfully.");
        toast({ title: "Execution complete", description: "JavaScript ran in the browser.", variant: "success" });
        return;
      }

      const response = await fetch(endpoints.codeRun, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: backendLanguageMap[language], code }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Execution failed.");
      }

      setOutput(data.output || data.result || "Execution completed.");
      toast({ title: "Execution complete", description: `${language} snippet finished running.`, variant: "success" });
    } catch (error) {
      setOutput(error.message);
      toast({ title: "Execution failed", description: error.message, variant: "destructive" });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSave = () => {
    localStorage.setItem(`apps-code-${language}`, code);
    toast({ title: "Saved locally", description: `${language} snippet saved to local storage.`, variant: "success" });
  };

  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-foreground">Online Code Editor</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsDarkEditor((prev) => !prev)}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold"
          >
            {isDarkEditor ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            {isDarkEditor ? "Light" : "Dark"}
          </button>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose language">
            {Object.keys(snippets).map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={language === item}
                onClick={() => handleLanguageChange(item)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  language === item ? "bg-[#FF3B30] text-white" : "border border-border text-foreground/75"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`mt-4 overflow-hidden rounded-xl border border-border/70 ${isDarkEditor ? "bg-[#0F1117] text-slate-200" : "bg-white text-slate-900"}`}>
        <div className={`flex items-center justify-between border-b px-3 py-2 text-xs ${isDarkEditor ? "border-white/10 text-slate-400" : "border-slate-200 text-slate-500"}`}>
          <span>{language}</span>
          <span>{lineCount} lines</span>
        </div>
        <div className="grid grid-cols-[auto_1fr]">
          <pre className={`select-none px-3 py-3 text-right text-xs leading-6 ${isDarkEditor ? "bg-white/5 text-slate-500" : "bg-slate-100 text-slate-400"}`}>
            {Array.from({ length: lineCount }, (_, idx) => idx + 1).join("\n")}
          </pre>
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="h-52 w-full resize-y bg-transparent px-3 py-3 font-mono text-xs leading-6 outline-none"
            aria-label="Code editor"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <motion.button whileHover={{ y: -1 }} type="button" disabled={isRunning} onClick={handleRun} className="inline-flex items-center gap-2 rounded-xl bg-[#FF3B30] px-4 py-2 text-sm font-semibold text-white">
          <Play className="h-4 w-4" /> {isRunning ? "Running..." : "Run / Preview"}
        </motion.button>
        <button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground/85">
          <Save className="h-4 w-4" /> Save locally
        </button>
      </div>

      {output ? <p className="mt-3 rounded-lg border border-emerald-500/35 bg-emerald-500/10 p-3 text-xs text-emerald-300">{output}</p> : null}
    </article>
  );
};

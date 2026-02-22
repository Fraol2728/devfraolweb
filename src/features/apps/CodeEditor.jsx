import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play, Save } from "lucide-react";
import { toast } from "@/hooks/useToastStore";

const snippets = {
  JavaScript: "console.log('Hello from JavaScript');",
  Python: "print('Hello from Python')",
  C: "#include <stdio.h>\nint main(){ printf(\"Hello C\\n\"); return 0; }",
  "C++": "#include <iostream>\nint main(){ std::cout << \"Hello C++\\n\"; }",
  Java: "class Main { public static void main(String[] args){ System.out.println(\"Hello Java\"); }}",
};

export const CodeEditor = () => {
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState(snippets.JavaScript);
  const [output, setOutput] = useState("");

  const lineCount = useMemo(() => code.split("\n").length, [code]);

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
    setCode(snippets[nextLanguage]);
    setOutput("");
  };

  const handleRun = () => {
    if (language === "JavaScript" || language === "Python") {
      setOutput(`Executed ${language} snippet successfully (simulated runtime).`);
      toast({ title: "Execution complete", description: `${language} snippet run finished.`, variant: "success" });
      return;
    }

    toast({
      title: "Preview unavailable",
      description: `${language} execution requires backend container integration.`,
      variant: "destructive",
    });
  };

  const handleSave = () => {
    localStorage.setItem(`apps-code-${language}`, code);
    toast({ title: "Saved locally", description: `${language} snippet saved to local storage.`, variant: "success" });
  };

  return (
    <article className="rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-foreground">Online Code Editor</h3>
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

      <div className="mt-4 overflow-hidden rounded-xl border border-border/70 bg-[#0F1117] text-slate-200">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-xs text-slate-400">
          <span>{language}</span>
          <span>{lineCount} lines</span>
        </div>
        <div className="grid grid-cols-[auto_1fr]">
          <pre className="select-none bg-white/5 px-3 py-3 text-right text-xs leading-6 text-slate-500">
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
        <motion.button whileHover={{ y: -1 }} type="button" onClick={handleRun} className="inline-flex items-center gap-2 rounded-xl bg-[#FF3B30] px-4 py-2 text-sm font-semibold text-white">
          <Play className="h-4 w-4" /> Run / Preview
        </motion.button>
        <button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground/85">
          <Save className="h-4 w-4" /> Save locally
        </button>
      </div>

      {output ? <p className="mt-3 rounded-lg border border-emerald-500/35 bg-emerald-500/10 p-3 text-xs text-emerald-300">{output}</p> : null}
    </article>
  );
};

import vm from "vm";

const JS_TIMEOUT_MS = 1500;

export const runCodeSnippet = async ({ language, code }) => {
  if (!language || !code) {
    throw new Error("language and code are required.");
  }

  if (language.toLowerCase() === "javascript") {
    const logs = [];
    const context = vm.createContext({
      console: { log: (...args) => logs.push(args.join(" ")) }
    });

    const script = new vm.Script(code);
    const result = script.runInContext(context, { timeout: JS_TIMEOUT_MS });

    return {
      language,
      output: logs.join("\n"),
      result: result === undefined ? null : result
    };
  }

  return {
    language,
    output: "Sandbox execution for this language is not configured yet.",
    result: null,
    warning: "Use Docker/isolate/firejail worker for Python/C/C++ execution in production."
  };
};

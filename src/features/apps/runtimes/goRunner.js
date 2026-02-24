const GO_RUNTIME_KEY = "__goRuntimePromise";

const loadGoRuntime = async () => {
  if (!window[GO_RUNTIME_KEY]) {
    window[GO_RUNTIME_KEY] = Promise.resolve({
      ready: true,
      mode: "wasm-stub",
    });
  }
  return window[GO_RUNTIME_KEY];
};

export const initializeGoRuntime = async () => {
  try {
    const runtime = await loadGoRuntime();
    return { success: true, runtime, error: null };
  } catch (error) {
    return { success: false, runtime: null, error: error?.message || String(error) };
  }
};

export const runGo = async () => ({
  success: false,
  output: "",
  error: "Go WASM runner is not bundled yet. Include wasm_exec.js and a WASI bridge to execute Go in-browser.",
});

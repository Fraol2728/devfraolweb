const RUST_RUNTIME_KEY = "__rustRuntimePromise";

const loadRustRuntime = async () => {
  if (!window[RUST_RUNTIME_KEY]) {
    window[RUST_RUNTIME_KEY] = Promise.resolve({
      ready: true,
      mode: "wasm-stub",
    });
  }
  return window[RUST_RUNTIME_KEY];
};

export const initializeRustRuntime = async () => {
  try {
    const runtime = await loadRustRuntime();
    return { success: true, runtime, error: null };
  } catch (error) {
    return { success: false, runtime: null, error: error?.message || String(error) };
  }
};

export const runRust = async () => ({
  success: false,
  output: "",
  error: "Rust WASM runner is not bundled yet. Provide a rustc-wasm toolchain bundle to execute Rust in-browser.",
});

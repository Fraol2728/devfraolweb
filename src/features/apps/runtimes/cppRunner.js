const CPP_RUNTIME_KEY = "__cppRuntimePromise";

const loadCppRuntime = async () => {
  if (!window[CPP_RUNTIME_KEY]) {
    window[CPP_RUNTIME_KEY] = Promise.resolve({
      ready: true,
      mode: "wasm-stub",
    });
  }

  return window[CPP_RUNTIME_KEY];
};

export const initializeCppRuntime = async () => {
  try {
    const runtime = await loadCppRuntime();
    return { success: true, runtime, error: null };
  } catch (error) {
    return { success: false, runtime: null, error: error?.message || String(error) };
  }
};

export const runCpp = async () => ({
  success: false,
  output: "",
  error: "C/C++ WASM toolchain is not available in this build. Attach an Emscripten runtime bundle to enable execution.",
});

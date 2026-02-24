const KEY = "devfraol.editor.packages.v1";

export const hydratePackages = () => {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
};

export const persistPackages = (state) => window.localStorage.setItem(KEY, JSON.stringify(state));

export const installPackageForProject = async ({ pyodide, projectId, packageName, installedByProject, onInstalled }) => {
  if (!pyodide) throw new Error("Pyodide not initialized");
  if (!packageName.trim()) return false;
  const already = installedByProject[projectId] ?? [];
  if (already.includes(packageName)) return false;
  await pyodide.loadPackage("micropip");
  pyodide.globals.set("__pkg_name", packageName);
  await pyodide.runPythonAsync(`
import micropip
await micropip.install(__pkg_name)
`);
  onInstalled(packageName);
  return true;
};

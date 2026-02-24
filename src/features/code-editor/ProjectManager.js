const PROJECT_EXPORT_VERSION = 1;

const walk = (nodes, path = "", out = []) => {
  nodes.forEach((node) => {
    const nextPath = path ? `${path}/${node.name}` : node.name;
    if (node.type === "file") out.push({ path: nextPath, content: node.content ?? "" });
    if (node.children) walk(node.children, nextPath, out);
  });
  return out;
};

export const buildProjectPayload = (project) => ({
  version: PROJECT_EXPORT_VERSION,
  project,
});

export const exportProjectAsJson = (project) => {
  const blob = new Blob([JSON.stringify(buildProjectPayload(project), null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${project.name}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
};

export const exportProjectAsZip = async (project, pyodide) => {
  if (!pyodide) throw new Error("Pyodide is required to export ZIP.");
  const files = walk(project.tree);
  pyodide.globals.set("__export_files", files);
  const zipBase64 = await pyodide.runPythonAsync(`
import base64, io, zipfile
buf = io.BytesIO()
with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
    for file in __export_files.to_py():
        zf.writestr(file["path"], file["content"])
base64.b64encode(buf.getvalue()).decode("utf-8")
`);
  const bytes = Uint8Array.from(atob(zipBase64), (m) => m.charCodeAt(0));
  const blob = new Blob([bytes], { type: "application/zip" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${project.name}.zip`;
  a.click();
  URL.revokeObjectURL(a.href);
};

export const importProjectFromFile = async (file, pyodide) => {
  const text = await file.text();
  if (file.name.endsWith(".json")) {
    const parsed = JSON.parse(text);
    return parsed.project ?? parsed;
  }
  if (!file.name.endsWith(".zip")) throw new Error("Unsupported file type");
  if (!pyodide) throw new Error("Initialize Pyodide before importing ZIP.");

  const arr = new Uint8Array(await file.arrayBuffer());
  const b64 = btoa(String.fromCharCode(...arr));
  pyodide.globals.set("__zip_b64", b64);
  const payload = await pyodide.runPythonAsync(`
import base64, io, json, zipfile
from pathlib import PurePosixPath

def insert(nodes, parts, content):
    if len(parts) == 1:
        nodes.append({"id": parts[0], "type": "file", "name": parts[0], "language": "python", "content": content})
        return
    folder = next((x for x in nodes if x["type"] == "folder" and x["name"] == parts[0]), None)
    if not folder:
        folder = {"id": parts[0], "type": "folder", "name": parts[0], "children": []}
        nodes.append(folder)
    insert(folder["children"], parts[1:], content)

raw = base64.b64decode(__zip_b64)
root = []
with zipfile.ZipFile(io.BytesIO(raw), "r") as zf:
    for name in zf.namelist():
        if name.endswith("/"):
            continue
        content = zf.read(name).decode("utf-8")
        insert(root, list(PurePosixPath(name).parts), content)
json.dumps({"name": "imported-project", "tree": root})
`);
  return JSON.parse(payload);
};

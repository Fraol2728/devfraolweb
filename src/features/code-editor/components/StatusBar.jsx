export const StatusBar = ({ activeFile, runtimeLoading, isPyodideReady }) => (
  <footer className="vsc-status-bar" aria-label="Status bar">
    <div className="vsc-status-left">
      <span>{activeFile ? `Ln 1, Col 1` : "Ln -, Col -"}</span>
      <span>{runtimeLoading ? "Running" : isPyodideReady ? "Ready" : "Runtime idle"}</span>
    </div>
    <div className="vsc-status-right">
      <span>Spaces: 4</span>
      <span>UTF-8</span>
      <span>Python</span>
    </div>
  </footer>
);

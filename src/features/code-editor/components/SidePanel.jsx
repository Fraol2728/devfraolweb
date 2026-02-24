export const SidePanel = ({ installedPackages, onInstallPackage }) => (
  <aside className="py-side-panel">
    <h4>Documentation / Packages</h4>
    <button
      type="button"
      onClick={() => {
        const pkg = window.prompt("Install package", "numpy");
        if (pkg) onInstallPackage(pkg);
      }}
    >
      Install package
    </button>
    <p>Installed: {installedPackages.length ? installedPackages.join(", ") : "None"}</p>
    <small>Tip: hover symbols in editor to view inline hints where available.</small>
  </aside>
);

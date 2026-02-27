export const SidePanel = ({ children, projectId, projects, onProjectChange }) => (
  <aside className="vsc-side-panel" aria-label="Explorer panel">
    <div className="vsc-panel-header">EXPLORER</div>
    <div className="vsc-panel-body">{children}</div>
    <div className="vsc-panel-footer">
      <label>
        Project
        <select value={projectId} onChange={(event) => onProjectChange(event.target.value)}>
          {Object.values(projects).map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  </aside>
);

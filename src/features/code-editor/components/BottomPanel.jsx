export const BottomPanel = ({ children }) => (
  <section className="vsc-bottom-panel" aria-label="Bottom terminal panel">
    <div className="vsc-bottom-tabs">
      <button type="button" className="active">TERMINAL</button>
      <button type="button">OUTPUT</button>
      <button type="button">PROBLEMS</button>
    </div>
    <div className="vsc-bottom-body">{children}</div>
  </section>
);

export const DebuggerPanel = ({ debuggerState }) => (
  <aside className="py-debugger-panel">
    <h4>Debugger</h4>
    <p>Line: {debuggerState.currentLine ?? "-"}</p>
    <pre>{JSON.stringify(debuggerState.variables ?? {}, null, 2)}</pre>
    {debuggerState.traceback ? <pre className="py-log-error">{debuggerState.traceback}</pre> : null}
  </aside>
);

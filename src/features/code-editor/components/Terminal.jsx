import { useEffect, useRef } from "react";

export const Terminal = ({ logs, onClear, onCopy, autoScroll, onToggleAutoScroll }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !autoScroll) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [logs, autoScroll]);

  return (
    <section className="py-terminal">
      <div className="py-terminal-header">
        <span>Terminal / Output</span>
        <div>
          <button type="button" onClick={onToggleAutoScroll}>{autoScroll ? "Auto-scroll: On" : "Auto-scroll: Off"}</button>
          <button type="button" onClick={onCopy}>Copy</button>
          <button type="button" onClick={onClear}>Clear</button>
        </div>
      </div>
      <div ref={ref} className="py-terminal-logs">
        {logs.map((log) => <p key={log.id} className={log.type === "error" ? "py-log-error" : "py-log-stdout"}>{log.text}</p>)}
      </div>
    </section>
  );
};

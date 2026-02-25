import { useEffect, useRef } from "react";

export const Terminal = ({ logs, onClear }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [logs]);

  return (
    <section className="py-terminal">
      <div className="py-terminal-header">
        <span>Terminal / Output</span>
        <div>
          <button type="button" onClick={onClear}>Clear</button>
        </div>
      </div>
      <div ref={ref} className="py-terminal-logs">
        {logs.map((log) => <p key={log.id} className={log.type === "error" ? "py-log-error" : "py-log-stdout"}>{log.message}</p>)}
      </div>
    </section>
  );
};

import { useEffect, useRef, useState } from "react";

export const Terminal = ({ logs, onClear, onCopy, autoScroll, onToggleAutoScroll, onCommand, onHistory, hideHeader = false }) => {
  const ref = useRef(null);
  const [command, setCommand] = useState("");

  useEffect(() => {
    if (!ref.current || !autoScroll) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [logs, autoScroll]);

  return (
    <section className="py-terminal">
      {!hideHeader ? (
        <div className="py-terminal-header">
          <span>Terminal / Output</span>
          <div>
            <button type="button" onClick={onToggleAutoScroll}>{autoScroll ? "Auto-scroll: On" : "Auto-scroll: Off"}</button>
            <button type="button" onClick={onCopy}>Copy</button>
            <button type="button" onClick={onClear}>Clear</button>
          </div>
        </div>
      ) : null}
      <div ref={ref} className="py-terminal-logs">
        {logs.map((log) => <p key={log.id} className={log.type === "error" ? "py-log-error" : "py-log-stdout"}>{log.text}</p>)}
      </div>
      <form
        className="py-terminal-input"
        onSubmit={(event) => {
          event.preventDefault();
          onCommand?.(command);
          setCommand("");
        }}
      >
        <input
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setCommand(onHistory?.("up") ?? "");
            }
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setCommand(onHistory?.("down") ?? "");
            }
          }}
          placeholder=">>> python snippet"
        />
        <button type="submit">Run</button>
      </form>
      {hideHeader ? (
        <div className="py-terminal-inline-actions">
          <button type="button" onClick={onToggleAutoScroll}>{autoScroll ? "Auto-scroll: On" : "Auto-scroll: Off"}</button>
          <button type="button" onClick={onCopy}>Copy</button>
          <button type="button" onClick={onClear}>Clear</button>
        </div>
      ) : null}
    </section>
  );
};

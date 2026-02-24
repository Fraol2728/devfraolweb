import { useLayoutStore } from "@/features/code-editor/stores/useLayoutStore";

export const ResizablePanels = ({ explorer, editor, terminal, terminalVisible }) => {
  const leftWidth = useLayoutStore((s) => s.leftWidth);
  const terminalHeight = useLayoutStore((s) => s.terminalHeight);
  const setLeftWidth = useLayoutStore((s) => s.setLeftWidth);
  const setTerminalHeight = useLayoutStore((s) => s.setTerminalHeight);

  const resizeExplorer = (event) => {
    const startX = event.clientX;
    const startW = leftWidth;

    const onMove = (moveEvent) => {
      const next = Math.max(180, Math.min(420, startW + moveEvent.clientX - startX));
      setLeftWidth(next);
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const resizeTerminal = (event) => {
    const startY = event.clientY;
    const startH = terminalHeight;

    const onMove = (moveEvent) => {
      const next = Math.max(120, Math.min(360, startH - (moveEvent.clientY - startY)));
      setTerminalHeight(next);
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div className="py-panel-shell">
      <div className="py-main-layout" style={{ gridTemplateColumns: `${leftWidth}px 6px minmax(0, 1fr)` }}>
        {explorer}
        <div className="py-resizer-x" onPointerDown={resizeExplorer} />
        {editor}
      </div>
      {terminalVisible ? (
        <div className="py-terminal-wrap" style={{ height: `${terminalHeight}px` }}>
          <div className="py-resizer-y" onPointerDown={resizeTerminal} />
          {terminal}
        </div>
      ) : null}
    </div>
  );
};

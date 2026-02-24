import { useLayoutStore } from "@/features/code-editor/stores/useLayoutStore";

export const ResizablePanels = ({ explorer, editor, terminal }) => {
  const leftWidth = useLayoutStore((s) => s.leftWidth);
  const terminalHeight = useLayoutStore((s) => s.terminalHeight);
  const explorerVisible = useLayoutStore((s) => s.explorerOpen);
  const terminalVisible = useLayoutStore((s) => s.terminalOpen);
  const setLeftWidth = useLayoutStore((s) => s.setLeftWidth);
  const setTerminalHeight = useLayoutStore((s) => s.setTerminalHeight);

  const resizeExplorer = (event) => {
    const startX = event.clientX;
    const startW = leftWidth;
    const onMove = (moveEvent) => setLeftWidth(startW + moveEvent.clientX - startX);
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
    const onMove = (moveEvent) => setTerminalHeight(startH - (moveEvent.clientY - startY));
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div className="py-panel-shell flex min-h-0 flex-1 flex-col">
      <div className="py-main-layout flex min-h-0 flex-1">
        {explorerVisible ? <div style={{ width: leftWidth }}>{explorer}</div> : null}
        {explorerVisible ? <div className="w-1 cursor-col-resize bg-transparent hover:bg-white/20" onPointerDown={resizeExplorer} /> : null}
        <div className="min-w-0 flex-1">{editor}</div>
      </div>
      {terminalVisible ? (
        <div className="py-terminal-wrap" style={{ height: terminalHeight }}>
          <div className="h-1 cursor-row-resize bg-transparent hover:bg-white/20" onPointerDown={resizeTerminal} />
          {terminal}
        </div>
      ) : null}
    </div>
  );
};

import { Box } from "@primer/react";

interface GutterProps {
  onResize: (delta: number) => void;
}

export function Gutter({ onResize }: GutterProps) {
  const onMouseDown = (event: React.MouseEvent) => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    const prevCursor = window.document.body.style.cursor;
    window.document.body.style.cursor = "col-resize";

    function onMouseMove(e: MouseEvent) {
      onResize(e.movementX);
      e.preventDefault();
    }

    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.document.body.style.cursor = prevCursor;
    }

    event.preventDefault();
  };

  return (
    <Box
      sx={{ width: "1px", height: "100%", backgroundColor: "blue", cursor: "col-resize", flexShrink: 0, ":hover": { backgroundColor: "red" } }}
      onMouseDown={onMouseDown}
    />
  );
}

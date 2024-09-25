import { Box } from "@primer/react";

interface GutterProps {
  onResize: (delta: number) => void;
}

export function Gutter({ onResize }: GutterProps) {
  const onDrag = (event: React.MouseEvent) => {
    const prevX = event.clientX;
    const newX = prevX - event.clientX;
    console.log("onDrag", prevX, newX);
    onResize(newX);
  };

  const onMouseDown = (event: React.MouseEvent) => {
    console.log("onMouseDown");
  };

  return (
    <Box sx={{ width: "100px", height: "100%", backgroundColor: "blue", cursor: "col-resize", draggable: true }} onDrag={onDrag} onMouseDown={onMouseDown} />
  );
}

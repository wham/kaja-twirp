import { PlayIcon, SyncIcon } from "@primer/octicons-react";
import { Box, Button, IconButton } from "@primer/react";

interface ControlBarProps {
  onRun: () => void;
  onRecompile: () => void;
}

export function ControlBar({ onRun, onRecompile }: ControlBarProps) {
  return (
    <Box sx={{ padding: 1, display: "flex" }}>
      <Box>
        <Button leadingVisual={PlayIcon} onClick={onRun} variant="primary" size="small">
          Run
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "right" }}>
        <IconButton icon={SyncIcon} aria-label="Recompile from .proto files" size="small" onClick={onRecompile} />
      </Box>
    </Box>
  );
}

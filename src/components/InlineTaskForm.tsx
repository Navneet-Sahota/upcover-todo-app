import { Button, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import TaskFormDialog from "./TaskFormDialog";

export default function InlineTaskForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  if (isMobile) return null;

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ mb: 3 }}
      >
        Create New Todo
      </Button>
      <TaskFormDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

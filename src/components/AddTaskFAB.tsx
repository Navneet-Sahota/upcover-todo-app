import { Fab, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddTaskFAB() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!isMobile) return null;

  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        "&:hover": {
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
        },
      }}
    >
      <AddIcon />
    </Fab>
  );
}

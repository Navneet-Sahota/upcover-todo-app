import { Box, Divider, Stack, Typography } from "@mui/material";
import AddTaskFAB from "./components/AddTaskFAB";
import Header from "./components/Header";
import InlineTaskForm from "./components/InlineTaskForm";
import DragDropList from "./components/DragDropList";

function App() {
  return (
    <Box
      maxWidth="600px"
      mx="auto"
      sx={{
        background: "linear-gradient(to bottom right, #f9fafb, #eef2f7)",
        px: 2,
        py: 4,
      }}
    >
      <Stack spacing={4}>
        <Header />

        <InlineTaskForm />

        <Box>
          <Typography variant="h6" gutterBottom>
            Incomplete
          </Typography>
          <DragDropList status="incomplete" />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Complete
          </Typography>
          <DragDropList status="complete" />
        </Box>
      </Stack>

      <AddTaskFAB />
    </Box>
  );
}

export default App;

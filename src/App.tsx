import {
  Box,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddTaskFAB from "./components/AddTaskFAB";
import Header from "./components/Header";
import DragDropList from "./components/DragDropList";

function App() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #f9fafb, #eef2f7)",
        px: isDesktop ? 24 : 2,
        pt: 4,
        minHeight: "calc(100vh - 32px)",
      }}
    >
      <Stack spacing={4}>
        <Header />

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
          sx={{
            height: isDesktop ? `calc(100vh - 200px)` : undefined,
          }}
        >
          <Box
            flex={1}
            sx={{
              minHeight: { xs: "30vh", md: "auto" },
              height: { xs: "30vh", md: "100%" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Incomplete
            </Typography>
            <Box
              sx={{
                height: isDesktop ? "calc(100% - 40px)" : "35vh",
              }}
              overflow="auto"
            >
              <DragDropList status="incomplete" />
            </Box>
          </Box>

          <Box
            flex={1}
            sx={{
              minHeight: { xs: "30vh", md: "auto" },
              height: { md: "100%" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Complete
            </Typography>
            <Box height="calc(100% - 40px)" overflow="auto">
              <DragDropList status="complete" />
            </Box>
          </Box>
        </Stack>
      </Stack>

      <AddTaskFAB />
    </Box>
  );
}

export default App;

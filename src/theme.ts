import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "linear-gradient(to bottom right, #f9fafb, #eef2f7)",
      paper: "#ffffff",
    },
    primary: {
      main: "#3B82F6",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6B7280",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: "#3B82F6",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#2563eb",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        },
      },
    },
  },
});

export default theme;

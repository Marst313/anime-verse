import type { ThemeOptions } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#06b6d4",
      light: "#22d3ee",
      dark: "#0891b2",
    },

    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    error: {
      main: "#ef4444",
    },
    warning: {
      main: "#f59e0b",
    },
    info: {
      main: "#06b6d4",
    },
    success: {
      main: "#10b981",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backdropFilter: "blur(20px)",
        },
      },
    },
  },
}

export const theme = createTheme(themeOptions)

export type AppTheme = typeof theme

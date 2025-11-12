import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router"

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.primary",
        px: 2,
      }}
    >
      <Typography variant="h2" sx={{ mb: 2, fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Oops! The page you looking for doesnt exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          void navigate("/")
        }}
        sx={{ textTransform: "none", borderRadius: 2 }}
      >
        Back to Home
      </Button>
    </Box>
  )
}

export default NotFoundPage

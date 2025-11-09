import { useNavigate } from "react-router"
import { Box, Typography, Container } from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import RefreshIcon from "@mui/icons-material/Refresh"
import HomeIcon from "@mui/icons-material/Home"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useAppDispatch } from "../store/hooks"
import { setPage, setSearchQuery } from "../store/anime/animeSlice"
import { ActionButton, GlassContainer } from "../styles/sharedStyle"

const ErrorIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
  fontSize: 120,
  color: theme.palette.error.main,
  filter: `drop-shadow(0 8px 24px ${alpha(theme.palette.error.main, 0.4)})`,
  animation: "pulse 2s ease-in-out infinite",
  "@keyframes pulse": {
    "0%, 100%": {
      opacity: 1,
      transform: "scale(1)",
    },
    "50%": {
      opacity: 0.8,
      transform: "scale(1.05)",
    },
  },
}))

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
  onGoHome?: () => void
}

const AnimeErrorPages = ({
  message = "Something went wrong",
  onRetry,
  onGoHome,
}: ErrorStateProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleBack = () => {
    navigate(-1)
  }

  const handleGoHome = () => {
    dispatch(setSearchQuery(""))
    dispatch(setPage(1))
    navigate(`/?page=1`)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Back Button */}
      <ActionButton
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        Back
      </ActionButton>

      <GlassContainer
        sx={{
          p: { xs: 4, sm: 6, md: 8 },
          textAlign: "center",
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <ErrorIcon />

        <Typography
          variant="h3"
          sx={{
            mt: 3,
            mb: 2,
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.95)",
            fontSize: { xs: "1.75rem", sm: "2.5rem" },
          }}
        >
          Oops! Something Went Wrong
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: { xs: "0.95rem", sm: "1.1rem" },
            lineHeight: 1.6,
          }}
        >
          {message}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {onRetry && (
            <ActionButton startIcon={<RefreshIcon />} onClick={onRetry}>
              Try Again
            </ActionButton>
          )}

          <ActionButton
            startIcon={<HomeIcon />}
            onClick={onGoHome || handleGoHome}
            sx={{
              "&:hover": {
                background: theme =>
                  `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.4)} 0%, ${alpha(theme.palette.secondary.main, 0.3)} 100%)`,
                border: theme =>
                  `1px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
                boxShadow: theme =>
                  `0 8px 24px ${alpha(theme.palette.secondary.main, 0.4)}`,
              },
            }}
          >
            Go Home
          </ActionButton>
        </Box>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 4,
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "0.85rem",
          }}
        >
          If the problem persists, please try refreshing the page
        </Typography>
      </GlassContainer>
    </Container>
  )
}

export default AnimeErrorPages

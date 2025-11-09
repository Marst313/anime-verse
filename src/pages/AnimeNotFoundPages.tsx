import { useNavigate } from "react-router"
import { Box, Typography, Container } from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import SearchOffIcon from "@mui/icons-material/SearchOff"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import HomeIcon from "@mui/icons-material/Home"
import { useAppDispatch } from "../store/hooks"
import { setPage, setSearchQuery } from "../store/anime/animeSlice"
import { ActionButton, GlassContainer } from "../styles/sharedStyle"

const NotFoundIcon = styled(Box)(({ theme }) => ({
  fontSize: 120,
  color: theme.palette.warning.main,
  filter: `drop-shadow(0 8px 24px ${alpha(theme.palette.warning.main, 0.4)})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  animation: "float 3s ease-in-out infinite",
  "@keyframes float": {
    "0%, 100%": {
      transform: "translateY(0px)",
    },
    "50%": {
      transform: "translateY(-10px)",
    },
  },
}))

interface NotFoundStateProps {
  title?: string
  message?: string
  showSearchIcon?: boolean
  onGoHome?: () => void
}

const AnimeNotFoundPages = ({
  title = "Anime Not Found",
  message = "We couldn't find the anime you're looking for. It might have been removed or the link is incorrect.",
  showSearchIcon = true,
  onGoHome,
}: NotFoundStateProps) => {
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
        <NotFoundIcon>
          {showSearchIcon ? (
            <SearchOffIcon sx={{ fontSize: 80 }} />
          ) : (
            <SentimentDissatisfiedIcon sx={{ fontSize: 80 }} />
          )}
        </NotFoundIcon>

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
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: { xs: "0.95rem", sm: "1.1rem" },
            lineHeight: 1.6,
            maxWidth: 500,
            mx: "auto",
          }}
        >
          {message}
        </Typography>

        <ActionButton
          startIcon={<HomeIcon />}
          onClick={onGoHome || handleGoHome}
          size="large"
          sx={{
            px: 4,
            py: 1.5,
          }}
        >
          Back to Home
        </ActionButton>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 4,
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "0.85rem",
          }}
        >
          Try searching for another anime or browse our collection
        </Typography>
      </GlassContainer>
    </Container>
  )
}

export default AnimeNotFoundPages

import { useParams, useNavigate } from "react-router"
import { useAppDispatch } from "../store/hooks"
import { setPage, setSearchQuery } from "../store/anime/animeSlice"
import { alpha } from "@mui/material/styles"
import {
  Box,
  Container,
  Typography,
  Stack,
  Grid,
  Link,
  Divider,
} from "@mui/material"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import StarIcon from "@mui/icons-material/Star"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import TvIcon from "@mui/icons-material/Tv"
import PeopleIcon from "@mui/icons-material/People"
import FavoriteIcon from "@mui/icons-material/Favorite"
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline"

import { useAnimeDetail } from "../utils/hooks/useAnimeQueries"
import { LoadingSkeleton, BreadCrumbs } from "../components"
import { AnimeNotFoundPages, AnimeErrorPages } from "./"
import {
  GlassBox,
  GlassButton,
  GlassChip,
  InfoCard,
  StatsChip,
} from "../styles/sharedStyle"

const AnimeDetailPages = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { data: selectedAnime, isLoading, error } = useAnimeDetail(Number(id))

  const handleBack = async () => {
    dispatch(setSearchQuery(""))
    dispatch(setPage(1))
    await navigate(`/?page=1`)
  }

  if (isLoading) {
    return <LoadingSkeleton variant="detail" />
  }

  if (error) {
    return <AnimeErrorPages />
  }

  if (!selectedAnime) {
    return <AnimeNotFoundPages />
  }

  const {
    title,
    title_english,
    title_japanese,
    images,
    score,
    scored_by,
    rank,
    popularity,
    members,
    favorites,
    status,
    episodes,
    duration,
    synopsis,
    background,
    genres,
    studios,
    producers,
    licensors,
    aired,
    rating,
    type,
    year,
    season,
    source,
    broadcast,
    demographics,
    themes,
    relations,
    streaming,
  } = selectedAnime

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <BreadCrumbs
        title={title}
        title_english={title_english}
        handleBack={() => void handleBack}
      />

      {/* Back Button */}
      <GlassButton
        startIcon={<ArrowBackIcon />}
        onClick={void handleBack}
        sx={{ mb: 3 }}
      >
        Back
      </GlassButton>

      <Grid container spacing={4}>
        {/* Left Column - Image & Quick Stats */}
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <Stack spacing={3}>
            {/* Image */}
            <Box
              component="img"
              src={images.jpg.large_image_url}
              alt={title}
              sx={{
                width: "100%",
                borderRadius: 4,
                border: theme =>
                  `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                boxShadow: theme =>
                  `0 12px 40px ${alpha(theme.palette.common.black, 0.5)}`,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            />

            {/* Score & Rank Card */}
            <GlassBox sx={{ p: 3 }}>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  mb: 1,
                  color: "#fbbf24",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 32 }} />
                {score ?? "N/A"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 2 }}
              >
                {scored_by ? `${scored_by.toLocaleString()} users` : ""}
              </Typography>
              <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />
              <Stack spacing={1.5}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    Rank
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ color: "rgba(255, 255, 255, 0.95)" }}
                  >
                    #{rank ?? "N/A"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    Popularity
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ color: "rgba(255, 255, 255, 0.95)" }}
                  >
                    #{popularity ?? "N/A"}
                  </Typography>
                </Box>
              </Stack>
            </GlassBox>

            {/* Community Stats */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <InfoCard>
                  <PeopleIcon sx={{ fontSize: 28, color: "#06b6d4", mb: 1 }} />
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ color: "rgba(255, 255, 255, 0.95)" }}
                  >
                    {members ? members.toLocaleString() : "N/A"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    Members
                  </Typography>
                </InfoCard>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <InfoCard>
                  <FavoriteIcon
                    sx={{ fontSize: 28, color: "#ec4899", mb: 1 }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ color: "rgba(255, 255, 255, 0.95)" }}
                  >
                    {favorites ? favorites.toLocaleString() : "N/A"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    Favorites
                  </Typography>
                </InfoCard>
              </Grid>
            </Grid>

            {/* Streaming Services */}
            {streaming.length > 0 && (
              <GlassBox sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PlayCircleOutlineIcon />
                  Watch On
                </Typography>
                <Stack spacing={1}>
                  {streaming.slice(0, 5).map((service, index: number) => (
                    <Link
                      key={index}
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        textDecoration: "none",
                        color: "rgba(255, 255, 255, 0.8)",
                        padding: 1.5,
                        borderRadius: 2,
                        border: "1px solid rgba(255,255,255,0.1)",
                        transition: "all 0.3s ease",
                        display: "block",
                        "&:hover": {
                          backgroundColor: "rgba(99, 102, 241, 0.2)",
                          borderColor: "rgba(99, 102, 241, 0.5)",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      {service.name}
                    </Link>
                  ))}
                </Stack>
              </GlassBox>
            )}
          </Stack>
        </Grid>

        {/* Right Column - Content */}
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <Stack spacing={3}>
            {/* Title Section */}
            <Box>
              <Typography
                variant="h3"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  background: theme =>
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {title}
              </Typography>

              {title_english && title_english !== title && (
                <Typography
                  variant="h5"
                  sx={{
                    mb: 1,
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {title_english}
                </Typography>
              )}

              {title_japanese && (
                <Typography
                  variant="h6"
                  sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                >
                  {title_japanese}
                </Typography>
              )}
            </Box>

            {/* Main Stats */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ flexWrap: "wrap", gap: 2 }}
            >
              <StatsChip color="#fbbf24">
                <StarIcon sx={{ color: "#fbbf24", fontSize: 20 }} />
                <Typography variant="body1" fontWeight={600} color="white">
                  {score ?? "N/A"}
                </Typography>
              </StatsChip>

              <StatsChip color="#ec4899">
                <TvIcon sx={{ color: "#ec4899", fontSize: 20 }} />
                <Typography variant="body1" fontWeight={600} color="white">
                  {type}
                </Typography>
              </StatsChip>

              <StatsChip color="#8b5cf6">
                <CalendarTodayIcon sx={{ color: "#8b5cf6", fontSize: 20 }} />
                <Typography variant="body1" fontWeight={600} color="white">
                  {season && year
                    ? `${season.charAt(0).toUpperCase() + season.slice(1)} ${String(year)}`
                    : (year ?? "N/A")}
                </Typography>
              </StatsChip>

              <StatsChip color="#06b6d4">
                <Typography variant="body1" fontWeight={600} color="white">
                  {episodes ?? "?"} Episodes
                </Typography>
              </StatsChip>
            </Stack>

            {/* Additional Info Grid */}
            <GlassBox sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    Status
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ color: "rgba(255, 255, 255, 0.95)" }}
                  >
                    {status ?? "N/A"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    Duration
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ color: "rgba(255, 255, 255, 0.95)" }}
                  >
                    {duration ?? "N/A"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    Rating
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ color: "rgba(255, 255, 255, 0.95)" }}
                  >
                    {rating ?? "N/A"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    Source
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ color: "rgba(255, 255, 255, 0.95)" }}
                  >
                    {source ?? "N/A"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 8, lg: 6 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    Aired
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ color: "rgba(255, 255, 255, 0.95)" }}
                  >
                    {aired?.string ?? "N/A"}
                  </Typography>
                </Grid>

                {broadcast.string && (
                  <Grid size={{ xs: 12, sm: 4, lg: 6 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                    >
                      Broadcast
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{ color: "rgba(255, 255, 255, 0.95)" }}
                    >
                      {broadcast.string}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </GlassBox>

            {/* Synopsis */}
            <Box>
              <Typography
                variant="h5"
                sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
              >
                Synopsis
              </Typography>
              <GlassBox sx={{ p: 3 }}>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  {synopsis ?? "No synopsis available."}
                </Typography>
              </GlassBox>
            </Box>

            {/* Background Info */}
            {background && (
              <Box>
                <Typography
                  variant="h5"
                  sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
                >
                  Background
                </Typography>
                <GlassBox sx={{ p: 3 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.8,
                      whiteSpace: "pre-line",
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    {background}
                  </Typography>
                </GlassBox>
              </Box>
            )}

            {/* Genres, Demographics, Themes */}
            <Grid container spacing={3}>
              {genres.length > 0 && (
                <Grid size={{ xs: 12, lg: 6 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
                  >
                    Genres
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ flexWrap: "wrap", gap: 1 }}
                  >
                    {genres.map(genre => (
                      <GlassChip key={genre.mal_id} label={genre.name} />
                    ))}
                  </Stack>
                </Grid>
              )}

              {demographics.length > 0 && (
                <Grid size={{ xs: 12, lg: 6 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
                  >
                    Demographics
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ flexWrap: "wrap", gap: 1 }}
                  >
                    {demographics.map(demo => (
                      <GlassChip key={demo.mal_id} label={demo.name} />
                    ))}
                  </Stack>
                </Grid>
              )}

              {themes.length > 0 && (
                <Grid size={{ xs: 12 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
                  >
                    Themes
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ flexWrap: "wrap", gap: 1 }}
                  >
                    {themes.map(theme => (
                      <GlassChip key={theme.mal_id} label={theme.name} />
                    ))}
                  </Stack>
                </Grid>
              )}
            </Grid>

            {/* Studios */}
            {studios.length > 0 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
                >
                  Studios
                </Typography>
                <GlassBox sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    {studios.map(s => s.name).join(", ")}
                  </Typography>
                </GlassBox>
              </Box>
            )}

            {/* Producers */}
            {producers.length > 0 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
                >
                  Producers
                </Typography>
                <GlassBox sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    {producers.map(p => p.name).join(", ")}
                  </Typography>
                </GlassBox>
              </Box>
            )}

            {/* Licensors */}
            {licensors.length > 0 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
                >
                  Licensors
                </Typography>
                <GlassBox sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    {licensors.map(l => l.name).join(", ")}
                  </Typography>
                </GlassBox>
              </Box>
            )}

            {/* Relations */}
            {relations.length > 0 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
                >
                  Related Anime
                </Typography>
                <GlassBox sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    {relations.map((relation, index) => (
                      <Grid size={{ xs: 12, sm: 6 }} key={index}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "secondary.main",
                            fontWeight: 600,
                            mb: 1,
                          }}
                        >
                          {relation.relation}
                        </Typography>
                        {relation.entry.map(entry => (
                          <Typography
                            key={entry.mal_id}
                            variant="body2"
                            sx={{
                              color: "rgba(255, 255, 255, 0.8)",
                              mb: 0.5,
                            }}
                          >
                            • {entry.name} ({entry.type})
                          </Typography>
                        ))}
                      </Grid>
                    ))}
                  </Grid>
                </GlassBox>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AnimeDetailPages

import { useState } from "react"
import {
  Box,
  Typography,
  Stack,
  Collapse,
  Skeleton,
  Container,
} from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"
import ClearIcon from "@mui/icons-material/Clear"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { clearGenres, toggleGenre } from "../store/anime/animeSlice"
import { useGenres } from "../utils/hooks/useAnimeQueries"
import {
  GlassContainer,
  GlassChip,
  HeaderBox,
  CountChip,
  GlassIconButton,
} from "../styles/sharedStyle"

const LoadingGenres = () => (
  <Container maxWidth="xl">
    <GlassContainer sx={{ mt: 3, mb: 3, p: { xs: 2, sm: 3 } }}>
      <HeaderBox sx={{ borderBottom: "none" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Skeleton
            variant="circular"
            width={24}
            height={24}
            sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
          />
          <Skeleton
            variant="text"
            width={150}
            height={32}
            sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
          />
        </Box>
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
        />
      </HeaderBox>

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={80 + Math.random() * 40}
            height={40}
            sx={{
              borderRadius: 5,
              bgcolor: "rgba(255, 255, 255, 0.1)",
            }}
          />
        ))}
      </Stack>
    </GlassContainer>
  </Container>
)

const GenreFilter = () => {
  const dispatch = useAppDispatch()
  const { selectedGenres } = useAppSelector(state => state.anime)
  const { data: genreList, isLoading: isGenreLoading } = useGenres()
  const [expanded, setExpanded] = useState(true)

  const handleGenreClick = (genreId: number) => {
    dispatch(toggleGenre(genreId))
  }

  const handleClearAll = () => {
    dispatch(clearGenres())
  }

  if (isGenreLoading) {
    return <LoadingGenres />
  }

  return (
    <Container maxWidth="xl">
      <GlassContainer sx={{ mt: 3, mb: 3, p: { xs: 2, sm: 3 } }}>
        <HeaderBox
          sx={{
            mb: expanded ? 2.5 : 0,
            borderBottom: expanded ? undefined : "none",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <FilterListIcon sx={{ color: "primary.main", fontSize: 24 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.95)",
                fontSize: "1.125rem",
              }}
            >
              Filter by Genre
            </Typography>
            {selectedGenres.length > 0 && (
              <CountChip label={selectedGenres.length} size="small" />
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {selectedGenres.length > 0 && (
              <GlassIconButton
                size="small"
                onClick={handleClearAll}
                className="clear-button"
                title="Clear all filters"
              >
                <ClearIcon fontSize="small" />
              </GlassIconButton>
            )}
            <GlassIconButton
              size="small"
              onClick={() => {
                setExpanded(!expanded)
              }}
              title={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </GlassIconButton>
          </Box>
        </HeaderBox>

        <Collapse in={expanded}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "wrap",
              gap: 1.5,
              pt: 0.5,
            }}
          >
            {genreList?.map(genre => (
              <GlassChip
                key={genre.mal_id}
                label={genre.name}
                onClick={() => {
                  handleGenreClick(genre.mal_id)
                }}
                className={
                  selectedGenres.includes(genre.mal_id) ? "selected" : ""
                }
              />
            ))}
          </Stack>
        </Collapse>
      </GlassContainer>
    </Container>
  )
}

export default GenreFilter

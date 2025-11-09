import { memo } from "react"
import { styled, alpha } from "@mui/material/styles"
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
} from "@mui/material"
import { StarBorder as StarBorderIcon } from "@mui/icons-material"
import { grey, yellow } from "@mui/material/colors"
import type { Anime } from "../types/anime.types"
import { GenreChip, GradientChip } from "../styles/sharedStyle"

interface AnimeCardProps {
  anime: Anime
  onClick: (id: number) => void
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.05)} 100%)`,
  WebkitBackdropFilter: "blur(10px) saturate(180%)",
  backdropFilter: "blur(10px) saturate(180%)",
  border: `1px solid ${alpha(theme.palette.common.white, 0.125)}`,
  borderRadius: 16,
  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.37)}`,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  "&:hover": {
    boxShadow: `0 16px 40px 0 ${alpha(theme.palette.primary.main, 0.4)}`,
    "& .gradient-border": {
      opacity: 1,
    },
  },
}))

const GradientBorder = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "3px",
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  opacity: 0,
  transition: "opacity 0.3s ease",
}))

const StyledCardMedia = styled(CardMedia)({
  aspectRatio: "3/4",
  width: "100%",
  objectFit: "cover",
  position: "relative",
})

const ScoreBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 12,
  right: 12,
  padding: "4px 12px",
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.common.black, 0.2)}`,
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.primary.dark,
  color: grey[50],
  gap: 4,
  zIndex: 1,
}))

const AnimeCard = memo(({ anime, onClick }: AnimeCardProps) => {
  return (
    <StyledCard onClick={() => onClick(anime.mal_id)}>
      <GradientBorder className="gradient-border" />

      <Box sx={{ position: "relative", width: "100%" }}>
        <StyledCardMedia image={anime.images.webp.large_image_url} />
        {anime.score && (
          <ScoreBox>
            <StarBorderIcon sx={{ fontSize: 16, color: yellow["A200"] }} />
            <Typography variant="body2" fontWeight={700} fontSize="0.85rem">
              {anime.score.toFixed(1)}
            </Typography>
          </ScoreBox>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 700,
            fontSize: "0.95rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "2.8em",
            mb: 1.5,
            lineHeight: 1.4,
          }}
        >
          {anime.title || anime.title_english}
        </Typography>

        <Stack
          direction="row"
          spacing={0.75}
          flexWrap="wrap"
          useFlexGap
          mb={1.5}
        >
          {anime.type && <GradientChip label={anime.type} size="small" />}
          {anime.year && <GradientChip label={anime.year} size="small" />}
          {anime.episodes && (
            <GradientChip label={`${anime.episodes} eps`} size="small" />
          )}
        </Stack>

        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {anime.genres.slice(0, 3).map(genre => (
            <GenreChip key={genre.mal_id} label={genre.name} size="small" />
          ))}
        </Stack>
      </CardContent>
    </StyledCard>
  )
})

export default AnimeCard

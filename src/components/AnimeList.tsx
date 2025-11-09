import { Grid, Box, Container, Typography } from "@mui/material"

import { PaginationComponents, LoadingSkeleton, AnimeCard } from "./"
import { AnimeListProps } from "../types/anime.types"
import { EmptyStateContainer } from "../styles/sharedStyle"

const AnimeList = ({
  animeList,
  currentPage,
  totalPages,
  isLoading = false,
  onPageChange,
  onAnimeClick,
}: AnimeListProps) => {
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    onPageChange(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (isLoading) {
    return <LoadingSkeleton variant="grid" />
  }

  if (!animeList || animeList.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <EmptyStateContainer>
          <Box sx={{ fontSize: "4rem", mb: 2 }}>🔍</Box>
          <Typography variant="h5" fontWeight={700} mb={1}>
            No Anime Found
          </Typography>
          <Typography color="text.secondary">
            Try searching for something else
          </Typography>
        </EmptyStateContainer>
      </Container>
    )
  }

  return (
    <Box sx={{ minHeight: "100vh", pb: 4 }}>
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        <Grid container spacing={3}>
          {animeList.map(anime => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
              key={anime.mal_id}
            >
              <AnimeCard anime={anime} onClick={onAnimeClick} />
            </Grid>
          ))}
        </Grid>

        {totalPages > 1 && (
          <PaginationComponents
            totalPages={totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}
      </Container>
    </Box>
  )
}

export default AnimeList

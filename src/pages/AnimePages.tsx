import { useNavigate, useSearchParams } from "react-router"
import { Box, Container } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setPage, setSearchQuery } from "../store/anime/animeSlice"

import TopAppBar from "../components/TopAppBar"
import GenreFilter from "../components/GenreFilter"
import AnimeList from "../components/AnimeList"
import ScrollOnTop from "../components/ScrollOnTop"

import { useAnimeList } from "../utils/hooks/useAnimeQueries"
import { useEffect } from "react"

const AnimePages = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const { currentPage, searchQuery, selectedGenres } = useAppSelector(
    state => state.anime,
  )

  const { data, error, isFetching } = useAnimeList(
    searchQuery,
    currentPage,
    selectedGenres,
  )

  const handlePageChange = (page: number) => {
    const params: Record<string, string> = { page: String(page) }

    if (searchQuery.trim() !== "") {
      params.s = searchQuery
    }

    dispatch(setPage(page))
    setSearchParams(params)
  }

  const handleAnimeClick = async (animeId: number) => {
    const query = searchQuery ? `&s=${searchQuery}` : ""
    await navigate(`/${String(animeId)}?page=${String(currentPage)}${query}`)
  }

  useEffect(() => {
    const pageParam = Number(searchParams.get("page") ?? "1")
    const searchParam = searchParams.get("s") ?? ""

    if (pageParam !== currentPage) {
      dispatch(setPage(pageParam))
    }

    if (searchParam !== searchQuery) {
      dispatch(setSearchQuery(searchParam))
    }
  }, [searchParams, currentPage, searchQuery, dispatch])

  return (
    <div className="App">
      {/* Top Navigation Bar */}
      <TopAppBar />

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* Error Message */}
        {error && (
          <Box sx={{ p: 4, textAlign: "center", color: "error.main" }}>
            Error: {error.message}
          </Box>
        )}

        {/* Genre Filter */}
        <GenreFilter />

        {/* Anime List */}
        <AnimeList
          animeList={data?.data}
          currentPage={currentPage}
          totalPages={data?.pagination.last_visible_page ?? 1}
          isLoading={isFetching}
          onPageChange={handlePageChange}
          onAnimeClick={id => void handleAnimeClick(id)}
        />
      </Container>

      {/*  Scroll-to-Top Button */}
      <ScrollOnTop />
    </div>
  )
}

export default AnimePages

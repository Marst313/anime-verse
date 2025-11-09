import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { type AnimeDetail } from "../../types/anime.types"

type AnimeState = {
  selectedAnime: AnimeDetail | null
  selectedGenres: number[]
  currentPage: number
  searchQuery: string
  isLoading: boolean
  error: string | null
  detailError: string | null
}

const initialState: AnimeState = {
  selectedAnime: null,
  selectedGenres: [],
  currentPage: 1,
  searchQuery: "",
  isLoading: false,
  error: null,
  detailError: null,
}

// Slice
const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    toggleGenre: (state, action: PayloadAction<number>) => {
      const genreId = action.payload
      const index = state.selectedGenres.indexOf(genreId)

      if (index > -1) {
        state.selectedGenres.splice(index, 1)
      } else {
        state.selectedGenres.push(genreId)
      }

      state.currentPage = 1
    },
    clearGenres: state => {
      state.selectedGenres = []
      state.currentPage = 1
    },
    clearError: state => {
      state.error = null
      state.detailError = null
    },
    clearSelectedAnime: state => {
      state.selectedAnime = null
      state.detailError = null
    },
  },
})

export const {
  setSearchQuery,
  setPage,
  clearError,
  clearSelectedAnime,
  toggleGenre,
  clearGenres,
} = animeSlice.actions

export default animeSlice.reducer

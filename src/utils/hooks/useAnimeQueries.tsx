import { useQuery, useQueryClient } from "@tanstack/react-query"
import { animeApi } from "../../store/anime/animeApi"
import { genresToString } from "../helpers"

export const animeKeys = {
  all: ["anime"] as const,
  lists: () => [...animeKeys.all, "list"] as const,
  list: (filters: { query?: string; page?: number; genres?: string }) =>
    [...animeKeys.lists(), filters] as const,
  details: () => [...animeKeys.all, "detail"] as const,
  detail: (id: number) => [...animeKeys.details(), id] as const,
  genres: () => [...animeKeys.all, "genres"] as const,
}

export const useAnimeList = (
  query = "",
  page = 1,
  genres: number[],
) => {
  const genresString = genresToString(genres)

  return useQuery({
    queryKey: animeKeys.list({ query, page, genres: genresString }),
    queryFn: async () => {
      if (query || genresString) {
        return await animeApi.searchAnime(query, page, genres)
      }
      return await animeApi.getTopAnime(page)
    },
    placeholderData: previousData => previousData,
    staleTime: 5 * 60 * 1000,
  })
}

export const useAnimeDetail = (id: number) => {
  return useQuery({
    queryKey: animeKeys.detail(id),
    queryFn: async () => {
      const response = await animeApi.getAnimeById(id)
      return response.data
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}

export const useGenres = () => {
  return useQuery({
    queryKey: animeKeys.genres(),
    queryFn: async () => {
      const response = await animeApi.getGenreAnime()
      return response.data
    },
    staleTime: 60 * 60 * 1000,
  })
}

export const usePrefetchAnimeList = () => {
  const queryClient = useQueryClient()

  const prefetchNextPage = async (
    query: string,
    currentPage: number,
    genres: number[],
  ) => {
    const genresString = genresToString(genres)

    await queryClient.prefetchQuery({
      queryKey: animeKeys.list({
        query,
        page: currentPage + 1,
        genres: genresString,
      }),
      queryFn: async () => {
        if (query) {
          return await animeApi.searchAnime(query, currentPage + 1, genres)
        }
        return await animeApi.getTopAnime(currentPage + 1)
      },
    })
  }

  return { prefetchNextPage }
}

import type { GenreResponse } from "../../types/anime.types"
import {
  type AnimeResponse,
  type AnimeDetailResponse,
} from "../../types/anime.types"

const BASE_URL = "https://api.jikan.moe/v4"
const RATE_LIMIT_DELAY = 1000

let lastRequestTime = 0

const rateLimitedFetch = async (url: string): Promise<Response> => {
  const now = Date.now()
  const timeSinceLastRequest = now - lastRequestTime

  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await new Promise(resolve =>
      setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest),
    )
  }

  lastRequestTime = Date.now()
  return fetch(url)
}

export const animeApi = {
  searchAnime: async (
    query: string,
    page = 1,
    genres: number[],
  ): Promise<AnimeResponse> => {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: "24",
      genres: genres.join(","),
    })

    const response = await rateLimitedFetch(
      `${BASE_URL}/anime?${params.toString()}`,
    )

    if (!response.ok) {
      throw new Error(
        `API Error: ${String(response.status)} ${response.statusText}`,
      )
    }

    return response.json() as Promise<AnimeResponse>
  },

  getAnimeById: async (id: number): Promise<AnimeDetailResponse> => {
    const response = await rateLimitedFetch(
      `${BASE_URL}/anime/${String(id)}/full`,
    )

    if (!response.ok) {
      throw new Error(
        `API Error: ${String(response.status)} ${response.statusText}`,
      )
    }

    return response.json() as Promise<AnimeDetailResponse>
  },

  getTopAnime: async (page = 1): Promise<AnimeResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: "24",
    })

    const response = await rateLimitedFetch(
      `${BASE_URL}/top/anime?${params.toString()}`,
    )

    if (!response.ok) {
      throw new Error(
        `API Error: ${String(response.status)} ${response.statusText}`,
      )
    }

    return response.json() as Promise<AnimeResponse>
  },

  getGenreAnime: async (): Promise<GenreResponse> => {
    const response = await rateLimitedFetch(`${BASE_URL}/genres/anime`)

    if (!response.ok) {
      throw new Error(
        `API Error: ${String(response.status)} ${response.statusText}`,
      )
    }

    return response.json() as Promise<GenreResponse>
  },
}

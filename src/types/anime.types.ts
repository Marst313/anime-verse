export type AnimeImage = {
  jpg: {
    image_url: string
    small_image_url: string
    large_image_url: string
  }
  webp: {
    image_url: string
    small_image_url: string
    large_image_url: string
  }
}

export type Genre = {
  mal_id: number
  name: string
  url: string
  count: number
}

export type Studio = {
  mal_id: number
  type: string
  name: string
  url: string
}

export type Relations = {
  relation: string
  entry: [
    {
      mal_id: number
      type: string
      name: string
      url: string
    },
  ]
}

export type Anime = {
  mal_id: number
  url: string
  images: AnimeImage
  title: string
  title_english: string | null
  title_japanese: string | null
  type: string | null
  source: string | null
  episodes: number | null
  status: string | null
  airing: boolean
  aired?: {
    from: string | null
    to: string | null
    string: string
  }
  duration: string | null
  rating: string | null
  score: number | null
  scored_by: number | null
  rank: number | null
  popularity: number | null
  members: number | null
  favorites: number | null
  synopsis: string | null
  background: string | null
  season: string | null
  year: number | null
  genres: Genre[]
  studios: Studio[]
}

export type AnimeDetail = {
  trailer: {
    youtube_id: string | null
    url: string | null
    embed_url: string | null
  }
  broadcast: {
    day: string
    time: string
    timezone: string
    string: string
  }
  relations: Relations[]
  streaming: { url: string; name: string }[]
  external: string
  producers: Studio[]
  licensors: Studio[]
  demographics: Genre[]
  themes: Genre[]
} & Anime

export type PaginationInfo = {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: {
    count: number
    total: number
    per_page: number
  }
}

export type AnimeResponse = {
  data: Anime[]
  pagination: PaginationInfo
}

export type GenreResponse = {
  data: Genre[]
}

export type AnimeDetailResponse = {
  data: AnimeDetail
}

export type AnimeListProps = {
  animeList: Anime[] | undefined
  currentPage: number
  totalPages: number
  isLoading?: boolean
  onPageChange: (page: number) => void
  onAnimeClick: (animeId: number) => void
}

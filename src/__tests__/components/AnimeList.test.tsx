import { render, screen, fireEvent } from "@testing-library/react"
import AnimeList from "../../components/AnimeList"
import "@testing-library/jest-dom"
import { vi } from "vitest"

beforeAll(() => {
  window.scrollTo = vi.fn()
})

describe("AnimeList Component", () => {
  const mockAnimeList = [
    {
      mal_id: 1,
      url: "https://myanimelist.net/anime/1",
      images: {
        jpg: {
          image_url: "",
          small_image_url: "",
          large_image_url: "",
        },
        webp: {
          image_url: "",
          small_image_url: "",
          large_image_url: "https://cdn.myanimelist.net/images/anime/1.webp",
        },
      },
      title: "Naruto",
      title_english: "Naruto",
      title_japanese: "ナルト",
      type: "TV",
      source: "Manga",
      episodes: 220,
      status: "Finished Airing",
      airing: false,
      aired: { from: null, to: null, string: "2002 to 2007" },
      duration: "23 min per ep",
      rating: "PG-13",
      score: 8.3,
      scored_by: 1200000,
      rank: 120,
      popularity: 50,
      members: 2000000,
      favorites: 150000,
      synopsis: "A story about a ninja.",
      background: null,
      season: "Fall",
      year: 2002,
      genres: [{ mal_id: 1, name: "Action", url: "", count: 0 }],
      studios: [
        { mal_id: 1, type: "Animation", name: "Studio Pierrot", url: "" },
      ],
    },
    {
      mal_id: 2,
      url: "https://myanimelist.net/anime/2",
      images: {
        jpg: {
          image_url: "",
          small_image_url: "",
          large_image_url: "",
        },
        webp: {
          image_url: "",
          small_image_url: "",
          large_image_url: "https://cdn.myanimelist.net/images/anime/2.webp",
        },
      },
      title: "Attack on Titan",
      title_english: "Attack on Titan",
      title_japanese: "進撃の巨人",
      type: "TV",
      source: "Manga",
      episodes: 75,
      status: "Finished Airing",
      airing: false,
      aired: { from: null, to: null, string: "2013 to 2023" },
      duration: "24 min per ep",
      rating: "R",
      score: 9.1,
      scored_by: 2000000,
      rank: 10,
      popularity: 1,
      members: 3000000,
      favorites: 250000,
      synopsis: "Humanity fights titans.",
      background: null,
      season: "Spring",
      year: 2013,
      genres: [{ mal_id: 2, name: "Drama", url: "", count: 0 }],
      studios: [{ mal_id: 2, type: "Animation", name: "Wit Studio", url: "" }],
    },
  ]

  it("renders loading state when isLoading = true", () => {
    render(
      <AnimeList
        animeList={[]}
        currentPage={1}
        totalPages={1}
        isLoading={true}
        onPageChange={vi.fn()}
        onAnimeClick={vi.fn()}
      />,
    )
    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument()
  })

  it("renders empty state when animeList is empty", () => {
    render(
      <AnimeList
        animeList={[]}
        currentPage={1}
        totalPages={1}
        onPageChange={vi.fn()}
        onAnimeClick={vi.fn()}
      />,
    )
    expect(screen.getByText("No Anime Found")).toBeInTheDocument()
  })

  it("renders anime cards when animeList has data", () => {
    render(
      <AnimeList
        animeList={mockAnimeList}
        currentPage={1}
        totalPages={1}
        onPageChange={vi.fn()}
        onAnimeClick={vi.fn()}
      />,
    )
    expect(screen.getByText("Naruto")).toBeInTheDocument()
  })

  it("renders pagination when totalPages > 1", () => {
    render(
      <AnimeList
        animeList={mockAnimeList}
        currentPage={1}
        totalPages={3}
        onPageChange={vi.fn()}
        onAnimeClick={vi.fn()}
      />,
    )
    expect(screen.getByRole("button", { name: /2/i })).toBeInTheDocument()
  })

  it("calls onPageChange when pagination button clicked", () => {
    const mockOnPageChange = vi.fn()
    render(
      <AnimeList
        animeList={mockAnimeList}
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
        onAnimeClick={vi.fn()}
      />,
    )
    fireEvent.click(screen.getByRole("button", { name: /2/i }))
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it("calls onAnimeClick when anime card clicked", () => {
    const mockOnAnimeClick = vi.fn()
    render(
      <AnimeList
        animeList={mockAnimeList}
        currentPage={1}
        totalPages={1}
        onPageChange={vi.fn()}
        onAnimeClick={mockOnAnimeClick}
      />,
    )
    const animeCard = screen.getByText("Naruto")
    fireEvent.click(animeCard)
    expect(mockOnAnimeClick).toHaveBeenCalled()
  })
})

import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { vi } from "vitest"
import AnimeCard from "../../components/AnimeCard"
import type { Anime } from "../../types/anime.types"

describe("AnimeCard Component", () => {
  const mockAnime: Anime = {
    mal_id: 1,
    title: "Attack on Titan",
    title_english: "Attack on Titan",
    images: {
      webp: {
        large_image_url:
          "https://cdn.myanimelist.net/images/anime/10/47347.webp",
      },
    },
    score: 8.7,
    type: "TV",
    year: 2013,
    episodes: 25,
    genres: [
      { mal_id: 1, name: "Action" },
      { mal_id: 2, name: "Drama" },
      { mal_id: 3, name: "Fantasy" },
    ],
  } as Anime

  it("renders anime title", () => {
    render(<AnimeCard anime={mockAnime} onClick={() => {}} />)
    expect(screen.getByText("Attack on Titan")).toBeInTheDocument()
  })

  it("renders anime image", () => {
    render(<AnimeCard anime={mockAnime} onClick={() => {}} />)
  })

  it("renders score when provided", () => {
    render(<AnimeCard anime={mockAnime} onClick={() => {}} />)
  })

  it("renders genre chips correctly", () => {
    render(<AnimeCard anime={mockAnime} onClick={() => {}} />)
    expect(screen.getByText("Action")).toBeInTheDocument()
    expect(screen.getByText("Drama")).toBeInTheDocument()
    expect(screen.getByText("Fantasy")).toBeInTheDocument()
  })

  it("renders type, year, and episode info", () => {
    render(<AnimeCard anime={mockAnime} onClick={() => {}} />)
    expect(screen.getByText("TV")).toBeInTheDocument()
    expect(screen.getByText("2013")).toBeInTheDocument()
    expect(screen.getByText("25 eps")).toBeInTheDocument()
  })

  it("calls onClick with correct anime ID", () => {
    const handleClick = vi.fn()
    render(<AnimeCard anime={mockAnime} onClick={handleClick} />)

    const card = screen.getByText("Attack on Titan")
    fireEvent.click(card)

    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleClick).toHaveBeenCalledWith(1)
  })
})

import { render, screen, fireEvent } from "@testing-library/react"
import GenreFilter from "../../components/GenreFilter"
import "@testing-library/jest-dom"
import { vi } from "vitest"

vi.mock("../../store/hooks", () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: (selector: any) =>
    selector({ anime: { selectedGenres: [1] } }),
}))

const mockToggleGenre = vi.fn()
const mockClearGenres = vi.fn()
vi.mock("../../store/anime/animeSlice", () => ({
  toggleGenre: (id: number) => mockToggleGenre(id),
  clearGenres: () => mockClearGenres(),
}))

vi.mock("../../utils/hooks/useAnimeQueries", () => ({
  useGenres: () => ({
    data: [
      { mal_id: 1, name: "Action" },
      { mal_id: 2, name: "Drama" },
    ],
    isLoading: false,
  }),
}))

describe("GenreFilter Component", () => {
  it("renders genres list when loaded", () => {
    render(<GenreFilter />)
    expect(screen.getByText("Action")).toBeInTheDocument()
    expect(screen.getByText("Drama")).toBeInTheDocument()
  })

  it("calls toggleGenre when a genre is clicked", () => {
    render(<GenreFilter />)
    fireEvent.click(screen.getByText("Action"))
    expect(mockToggleGenre).toHaveBeenCalledWith(1)
  })

  it("calls clearGenres when clear button is clicked", () => {
    render(<GenreFilter />)
    const clearButton = screen.getByTitle("Clear all filters")
    fireEvent.click(clearButton)
    expect(mockClearGenres).toHaveBeenCalled()
  })

  it("toggles expand/collapse when expand button clicked", () => {
    render(<GenreFilter />)
    const expandButton = screen.getByTitle("Collapse")
    fireEvent.click(expandButton)
    expect(screen.getByTitle("Expand")).toBeInTheDocument()
  })
})

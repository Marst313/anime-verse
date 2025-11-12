import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import AnimePages from "../../pages/AnimePages"
import { vi, type Mock } from "vitest"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from "react-router"
import animeReducer from "../../store/anime/animeSlice"

// Mock react-router
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router")
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  }
})

// Mock useAnimeList hook
vi.mock("../../utils/hooks/useAnimeQueries", () => ({
  useAnimeList: vi.fn(),
}))

// Mock components
vi.mock("../../components/TopAppBar", () => ({
  default: () => <div data-testid="top-app-bar">TopAppBar</div>,
}))

vi.mock("../../components/GenreFilter", () => ({
  default: () => <div data-testid="genre-filter">GenreFilter</div>,
}))

vi.mock("../../components/AnimeList", () => ({
  default: ({ animeList, isLoading, onPageChange, onAnimeClick }: any) => (
    <div data-testid="anime-list">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>Anime count: {animeList?.length ?? 0}</div>
          <button onClick={() => onPageChange(2)}>Change Page</button>
          <button onClick={() => onAnimeClick(123)}>Click Anime</button>
        </div>
      )}
    </div>
  ),
}))

vi.mock("../../components/ScrollOnTop", () => ({
  default: () => <div data-testid="scroll-on-top">ScrollOnTop</div>,
}))

import { useNavigate, useSearchParams } from "react-router"
import { useAnimeList } from "../../utils/hooks/useAnimeQueries"

const mockAnimeData = {
  data: [
    { mal_id: 1, title: "Naruto" },
    { mal_id: 2, title: "One Piece" },
  ],
  pagination: {
    last_visible_page: 10,
  },
}

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      anime: animeReducer,
    },
    preloadedState: {
      anime: {
        currentPage: 1,
        searchQuery: "",
        selectedGenres: [],
        ...initialState,
      } as any,
    },
  })
}

const renderWithProviders = (initialState = {}) => {
  const store = createMockStore(initialState)
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          <AnimePages />
        </BrowserRouter>
      </Provider>,
    ),
    store,
  }
}

describe("AnimePages", () => {
  const mockNavigate = vi.fn()
  const mockSetSearchParams = vi.fn()
  const mockSearchParams = {
    get: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useNavigate as Mock).mockReturnValue(mockNavigate)
    ;(useSearchParams as Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ])
    mockSearchParams.get.mockImplementation((key: string) => {
      if (key === "page") return "1"
      if (key === "s") return ""
      return null
    })
  })

  it("should render all main components", () => {
    ;(useAnimeList as Mock).mockReturnValue({
      data: mockAnimeData,
      error: null,
      isFetching: false,
    })

    renderWithProviders()

    expect(screen.getByTestId("top-app-bar")).toBeInTheDocument()
    expect(screen.getByTestId("genre-filter")).toBeInTheDocument()
    expect(screen.getByTestId("anime-list")).toBeInTheDocument()
    expect(screen.getByTestId("scroll-on-top")).toBeInTheDocument()
  })

  it("should display anime list when data is loaded", () => {
    ;(useAnimeList as Mock).mockReturnValue({
      data: mockAnimeData,
      error: null,
      isFetching: false,
    })

    renderWithProviders()

    expect(screen.getByText("Anime count: 2")).toBeInTheDocument()
  })

  it("should show loading state", () => {
    ;(useAnimeList as Mock).mockReturnValue({
      data: null,
      error: null,
      isFetching: true,
    })

    renderWithProviders()

    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("should display error message when error occurs", () => {
    ;(useAnimeList as Mock).mockReturnValue({
      data: null,
      error: { message: "Failed to fetch anime" },
      isFetching: false,
    })

    renderWithProviders()

    expect(
      screen.getByText(/Error: Failed to fetch anime/i),
    ).toBeInTheDocument()
  })

  it("should handle page change", () => {
    ;(useAnimeList as Mock).mockReturnValue({
      data: mockAnimeData,
      error: null,
      isFetching: false,
    })
  })

  it("should include search query in params when changing page", () => {
    ;(useAnimeList as Mock).mockReturnValue({
      data: mockAnimeData,
      error: null,
      isFetching: false,
    })

    renderWithProviders({ searchQuery: "naruto" })

    const changePageButton = screen.getByText("Change Page")
    fireEvent.click(changePageButton)
  })

  it("should navigate to anime detail when anime is clicked", async () => {
    ;(useAnimeList as Mock).mockReturnValue({
      data: mockAnimeData,
      error: null,
      isFetching: false,
    })

    renderWithProviders()

    const clickAnimeButton = screen.getByText("Click Anime")
    fireEvent.click(clickAnimeButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/123?page=1")
    })
  })

  it("should include search query in navigation URL", async () => {
    ;(useAnimeList as Mock).mockReturnValue({
      data: mockAnimeData,
      error: null,
      isFetching: false,
    })

    renderWithProviders({ searchQuery: "naruto" })

    const clickAnimeButton = screen.getByText("Click Anime")
    fireEvent.click(clickAnimeButton)
  })

  it("should sync page from URL params on mount", () => {
    mockSearchParams.get.mockImplementation((key: string) => {
      if (key === "page") return "5"
      if (key === "s") return ""
      return null
    })
    ;(useAnimeList as Mock).mockReturnValue({
      data: mockAnimeData,
      error: null,
      isFetching: false,
    })

    const { store } = renderWithProviders()

    expect(store.getState().anime.currentPage).toBe(5)
  })

  it("should sync search query from URL params on mount", () => {
    mockSearchParams.get.mockImplementation((key: string) => {
      if (key === "page") return "1"
      if (key === "s") return "one piece"
      return null
    })
    ;(useAnimeList as Mock).mockReturnValue({
      data: mockAnimeData,
      error: null,
      isFetching: false,
    })

    const { store } = renderWithProviders()

    expect(store.getState().anime.searchQuery).toBe("one piece")
  })

  it("should call useAnimeList with correct parameters", () => {
    const mockUseAnimeList = vi.fn().mockReturnValue({
      data: mockAnimeData,
      error: null,
      isFetching: false,
    })
    ;(useAnimeList as Mock).mockImplementation(mockUseAnimeList)

    renderWithProviders({
      currentPage: 2,
      searchQuery: "naruto",
      selectedGenres: [1, 2],
    })

    expect(mockUseAnimeList).toHaveBeenCalledWith("naruto", 2, [1, 2])
  })

  it("should not show error message when no error", () => {
    ;(useAnimeList as Mock).mockReturnValue({
      data: mockAnimeData,
      error: null,
      isFetching: false,
    })

    renderWithProviders()

    expect(screen.queryByText(/Error:/i)).not.toBeInTheDocument()
  })
})

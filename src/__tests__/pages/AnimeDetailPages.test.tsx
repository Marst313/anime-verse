import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import AnimeDetailPages from "../../pages/AnimeDetailPages"
import { vi, type Mock } from "vitest"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from "react-router"
import animeReducer from "../../store/anime/animeSlice"

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router")
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  }
})

vi.mock("../../utils/hooks/useAnimeQueries", () => ({
  useAnimeDetail: vi.fn(),
}))

vi.mock("../../components", () => ({
  LoadingSkeleton: () => <div data-testid="loading-skeleton">Loading...</div>,
  BreadCrumbs: ({ title }: any) => <div data-testid="breadcrumbs">{title}</div>,
}))

vi.mock("../../pages", () => ({
  AnimeNotFoundPages: () => <div data-testid="not-found">Not Found</div>,
  AnimeErrorPages: () => <div data-testid="error-page">Error</div>,
}))

import { useParams, useNavigate } from "react-router"
import { useAnimeDetail } from "../../utils/hooks/useAnimeQueries"

const mockAnimeData = {
  title: "Naruto",
  title_english: "Naruto",
  title_japanese: "ナルト",
  images: { jpg: { large_image_url: "https://example.com/naruto.jpg" } },
  score: 8.5,
  scored_by: 1000000,
  rank: 100,
  popularity: 50,
  members: 2000000,
  favorites: 500000,
  status: "Finished Airing",
  episodes: 220,
  duration: "23 min per ep",
  synopsis: "A young ninja's journey",
  background: "Background info",
  genres: [{ mal_id: 1, name: "Action" }],
  studios: [{ mal_id: 1, name: "Studio Pierrot" }],
  producers: [{ mal_id: 1, name: "TV Tokyo" }],
  licensors: [{ mal_id: 1, name: "Viz Media" }],
  aired: { string: "Oct 3, 2002 to Feb 8, 2007" },
  rating: "PG-13",
  type: "TV",
  year: 2002,
  season: "fall",
  source: "Manga",
  broadcast: { string: "Thursdays at 19:30 (JST)" },
  demographics: [{ mal_id: 1, name: "Shounen" }],
  themes: [{ mal_id: 1, name: "Martial Arts" }],
  relations: [
    {
      relation: "Sequel",
      entry: [{ mal_id: 2, name: "Naruto Shippuden", type: "TV" }],
    },
  ],
  streaming: [{ name: "Crunchyroll", url: "https://crunchyroll.com" }],
}

const createMockStore = () => {
  return configureStore({
    reducer: {
      anime: animeReducer,
    },
  })
}

const renderWithProviders = () => {
  const store = createMockStore()
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          <AnimeDetailPages />
        </BrowserRouter>
      </Provider>,
    ),
    store,
  }
}

describe("AnimeDetailPages", () => {
  const mockNavigate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useNavigate as Mock).mockReturnValue(mockNavigate)
    ;(useParams as Mock).mockReturnValue({ id: "1" })
  })

  it("should render loading skeleton when loading", () => {
    ;(useAnimeDetail as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    })

    renderWithProviders()
    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument()
  })

  it("should render error page when error occurs", () => {
    ;(useAnimeDetail as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch"),
    })

    renderWithProviders()
    expect(screen.getByTestId("error-page")).toBeInTheDocument()
  })

  it("should render not found page when no data", () => {
    ;(useAnimeDetail as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    renderWithProviders()
    expect(screen.getByTestId("not-found")).toBeInTheDocument()
  })

  it("should render anime title when data is loaded", () => {
    ;(useAnimeDetail as Mock).mockReturnValue({
      data: mockAnimeData,
      isLoading: false,
      error: null,
    })

    renderWithProviders()
    expect(screen.getByText("ナルト")).toBeInTheDocument()
  })

  it("should render anime score", () => {
    ;(useAnimeDetail as Mock).mockReturnValue({
      data: mockAnimeData,
      isLoading: false,
      error: null,
    })

    renderWithProviders()
  })

  it("should render back button", () => {
    ;(useAnimeDetail as Mock).mockReturnValue({
      data: mockAnimeData,
      isLoading: false,
      error: null,
    })

    renderWithProviders()
    const backButton = screen.getByText("Back")
    expect(backButton).toBeInTheDocument()
  })

  it("should navigate to home page when back button is clicked", async () => {
    ;(useAnimeDetail as Mock).mockReturnValue({
      data: mockAnimeData,
      isLoading: false,
      error: null,
    })

    renderWithProviders()
    const backButton = screen.getByText("Back")
    fireEvent.click(backButton)
  })

  it("should render synopsis section", () => {
    ;(useAnimeDetail as Mock).mockReturnValue({
      data: mockAnimeData,
      isLoading: false,
      error: null,
    })

    renderWithProviders()
    expect(screen.getByText("Synopsis")).toBeInTheDocument()
    expect(screen.getByText("A young ninja's journey")).toBeInTheDocument()
  })

  it("should render genres section when genres exist", () => {
    ;(useAnimeDetail as Mock).mockReturnValue({
      data: mockAnimeData,
      isLoading: false,
      error: null,
    })

    renderWithProviders()
    expect(screen.getByText("Genres")).toBeInTheDocument()
    expect(screen.getByText("Action")).toBeInTheDocument()
  })

  it("should render streaming services when available", () => {
    ;(useAnimeDetail as Mock).mockReturnValue({
      data: mockAnimeData,
      isLoading: false,
      error: null,
    })

    renderWithProviders()
    expect(screen.getByText("Watch On")).toBeInTheDocument()
    expect(screen.getByText("Crunchyroll")).toBeInTheDocument()
  })
})

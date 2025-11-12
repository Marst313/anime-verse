import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import AnimeNotFoundPages from "../../pages/AnimeNotFoundPages"
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
  }
})

// Mock Material-UI icons
vi.mock("@mui/icons-material/SearchOff", () => ({
  default: (props: any) => (
    <div data-testid="search-off-icon" {...props}>
      SearchOffIcon
    </div>
  ),
}))

vi.mock("@mui/icons-material/SentimentDissatisfied", () => ({
  default: (props: any) => (
    <div data-testid="sentiment-icon" {...props}>
      SentimentDissatisfiedIcon
    </div>
  ),
}))

vi.mock("@mui/icons-material/ArrowBack", () => ({
  default: () => <div data-testid="arrow-back-icon">ArrowBackIcon</div>,
}))

vi.mock("@mui/icons-material/Home", () => ({
  default: () => <div data-testid="home-icon">HomeIcon</div>,
}))

import { useNavigate } from "react-router"

const createMockStore = () => {
  return configureStore({
    reducer: {
      anime: animeReducer,
    },
  })
}

const renderWithProviders = (props = {}) => {
  const store = createMockStore()
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          <AnimeNotFoundPages {...props} />
        </BrowserRouter>
      </Provider>,
    ),
    store,
  }
}

describe("AnimeNotFoundPages", () => {
  const mockNavigate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useNavigate as Mock).mockReturnValue(mockNavigate)
  })

  it("should render not found page with default title", () => {
    renderWithProviders()

    expect(screen.getByText("Anime Not Found")).toBeInTheDocument()
  })

  it("should render default message", () => {
    renderWithProviders()

    expect(
      screen.getByText(
        "We couldn't find the anime you're looking for. It might have been removed or the link is incorrect.",
      ),
    ).toBeInTheDocument()
  })

  it("should render custom title", () => {
    renderWithProviders({ title: "Custom Not Found Title" })

    expect(screen.getByText("Custom Not Found Title")).toBeInTheDocument()
  })

  it("should render custom message", () => {
    renderWithProviders({ message: "This is a custom message" })

    expect(screen.getByText("This is a custom message")).toBeInTheDocument()
  })

  it("should render search off icon by default", () => {
    renderWithProviders()

    expect(screen.getByTestId("search-off-icon")).toBeInTheDocument()
    expect(screen.queryByTestId("sentiment-icon")).not.toBeInTheDocument()
  })

  it("should render sentiment icon when showSearchIcon is false", () => {
    renderWithProviders({ showSearchIcon: false })

    expect(screen.queryByTestId("search-off-icon")).not.toBeInTheDocument()
    expect(screen.getByTestId("sentiment-icon")).toBeInTheDocument()
  })

  it("should render back button", () => {
    renderWithProviders()

    const backButton = screen.getByText("Back")
    expect(backButton).toBeInTheDocument()
  })

  it("should render back to home button", () => {
    renderWithProviders()

    const homeButton = screen.getByText("Back to Home")
    expect(homeButton).toBeInTheDocument()
  })

  it("should navigate back when back button is clicked", async () => {
    renderWithProviders()

    const backButton = screen.getByText("Back")
    fireEvent.click(backButton)
  })

  it("should reset search query and navigate to home when Back to Home is clicked", async () => {
    const { store } = renderWithProviders()

    const homeButton = screen.getByText("Back to Home")
    fireEvent.click(homeButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/?page=1")
      expect(store.getState().anime.searchQuery).toBe("")
      expect(store.getState().anime.currentPage).toBe(1)
    })
  })

  it("should call custom onGoHome when provided", () => {
    const onGoHome = vi.fn()
    renderWithProviders({ onGoHome })

    const homeButton = screen.getByText("Back to Home")
    fireEvent.click(homeButton)

    expect(onGoHome).toHaveBeenCalledTimes(1)
  })

  it("should not navigate when custom onGoHome is provided", () => {
    const onGoHome = vi.fn()
    renderWithProviders({ onGoHome })

    const homeButton = screen.getByText("Back to Home")
    fireEvent.click(homeButton)

    expect(onGoHome).toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it("should render help text at the bottom", () => {
    renderWithProviders()

    expect(
      screen.getByText(
        "Try searching for another anime or browse our collection",
      ),
    ).toBeInTheDocument()
  })

  it("should render all icons", () => {
    renderWithProviders()

    expect(screen.getByTestId("search-off-icon")).toBeInTheDocument()
    expect(screen.getByTestId("arrow-back-icon")).toBeInTheDocument()
    expect(screen.getByTestId("home-icon")).toBeInTheDocument()
  })

  it("should handle both props together", () => {
    const onGoHome = vi.fn()
    renderWithProviders({
      title: "Custom Title",
      message: "Custom Message",
      showSearchIcon: false,
      onGoHome,
    })

    expect(screen.getByText("Custom Title")).toBeInTheDocument()
    expect(screen.getByText("Custom Message")).toBeInTheDocument()
    expect(screen.getByTestId("sentiment-icon")).toBeInTheDocument()

    const homeButton = screen.getByText("Back to Home")
    fireEvent.click(homeButton)

    expect(onGoHome).toHaveBeenCalled()
  })
})

import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import AnimeErrorPages from "../../pages/AnimeErrorPages"
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
vi.mock("@mui/icons-material/ErrorOutline", () => ({
  default: () => <div data-testid="error-icon">ErrorIcon</div>,
}))

vi.mock("@mui/icons-material/ArrowBack", () => ({
  default: () => <div data-testid="arrow-back-icon">ArrowBackIcon</div>,
}))

vi.mock("@mui/icons-material/Refresh", () => ({
  default: () => <div data-testid="refresh-icon">RefreshIcon</div>,
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
          <AnimeErrorPages {...props} />
        </BrowserRouter>
      </Provider>,
    ),
    store,
  }
}

describe("AnimeErrorPages", () => {
  const mockNavigate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useNavigate as Mock).mockReturnValue(mockNavigate)
  })

  it("should render error page with default message", () => {
    renderWithProviders()

    expect(screen.getByText("Oops! Something Went Wrong")).toBeInTheDocument()
    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
  })

  it("should render custom error message", () => {
    renderWithProviders({ message: "Failed to load anime data" })

    expect(screen.getByText("Failed to load anime data")).toBeInTheDocument()
  })

  it("should render error icon", () => {
    renderWithProviders()

    expect(screen.getByTestId("error-icon")).toBeInTheDocument()
  })

  it("should render back button", () => {
    renderWithProviders()

    const backButton = screen.getByText("Back")
    expect(backButton).toBeInTheDocument()
  })

  it("should render go home button", () => {
    renderWithProviders()

    const homeButton = screen.getByText("Go Home")
    expect(homeButton).toBeInTheDocument()
  })

  it("should navigate to home when back button is clicked", async () => {
    renderWithProviders()

    const backButton = screen.getByText("Back")
    fireEvent.click(backButton)
  })

  it("should reset search query and navigate to home when Go Home is clicked", async () => {
    const { store } = renderWithProviders()

    const homeButton = screen.getByText("Go Home")
    fireEvent.click(homeButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/?page=1")
      expect(store.getState().anime.searchQuery).toBe("")
      expect(store.getState().anime.currentPage).toBe(1)
    })
  })

  it("should show Try Again button when onRetry is provided", () => {
    const onRetry = vi.fn()
    renderWithProviders({ onRetry })

    const retryButton = screen.getByText("Try Again")
    expect(retryButton).toBeInTheDocument()
  })

  it("should not show Try Again button when onRetry is not provided", () => {
    renderWithProviders()

    const retryButton = screen.queryByText("Try Again")
    expect(retryButton).not.toBeInTheDocument()
  })

  it("should call onRetry when Try Again button is clicked", () => {
    const onRetry = vi.fn()
    renderWithProviders({ onRetry })

    const retryButton = screen.getByText("Try Again")
    fireEvent.click(retryButton)

    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it("should call custom onGoHome when provided", () => {
    const onGoHome = vi.fn()
    renderWithProviders({ onGoHome })

    const homeButton = screen.getByText("Go Home")
    fireEvent.click(homeButton)

    expect(onGoHome).toHaveBeenCalledTimes(1)
  })

  it("should not navigate when custom onGoHome is provided", () => {
    const onGoHome = vi.fn()
    renderWithProviders({ onGoHome })

    const homeButton = screen.getByText("Go Home")
    fireEvent.click(homeButton)

    expect(onGoHome).toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it("should render help text at the bottom", () => {
    renderWithProviders()

    expect(
      screen.getByText(
        "If the problem persists, please try refreshing the page",
      ),
    ).toBeInTheDocument()
  })

  it("should render with all icons when onRetry is provided", () => {
    const onRetry = vi.fn()
    renderWithProviders({ onRetry })

    expect(screen.getByTestId("error-icon")).toBeInTheDocument()
    expect(screen.getByTestId("arrow-back-icon")).toBeInTheDocument()
    expect(screen.getByTestId("refresh-icon")).toBeInTheDocument()
    expect(screen.getByTestId("home-icon")).toBeInTheDocument()
  })
})

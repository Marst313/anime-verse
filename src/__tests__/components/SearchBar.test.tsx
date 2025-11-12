import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import SearchBar from "../../components/SearchBar"
import { vi } from "vitest"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from "react-router"
import animeReducer from "../../store/anime/animeSlice"

vi.mock("@mui/icons-material/Search", () => ({
  default: () => <div data-testid="search-icon">SearchIcon</div>,
}))

vi.mock("@mui/icons-material/Close", () => ({
  default: () => <div data-testid="close-icon">CloseIcon</div>,
}))

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      anime: animeReducer,
    },
    preloadedState: {
      anime: {
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
          <SearchBar />
        </BrowserRouter>
      </Provider>,
    ),
    store,
  }
}

describe("SearchBar Component", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it("should render search input with placeholder", () => {
    renderWithProviders()
    const input = screen.getByPlaceholderText("Search anime...")
    expect(input).toBeInTheDocument()
  })

  it("should render search icon when not loading", () => {
    renderWithProviders()
    expect(screen.getByTestId("search-icon")).toBeInTheDocument()
  })

  it("should render loading spinner when isLoading is true", () => {
    renderWithProviders({ isLoading: true })
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("should show clear button when input has value", () => {
    renderWithProviders({ searchQuery: "naruto" })
    const clearButton = screen.getByLabelText("clear search")
    expect(clearButton).toBeInTheDocument()
  })

  it("should update input value on change", () => {
    renderWithProviders()
    const input = screen.getByPlaceholderText(
      "Search anime...",
    ) as HTMLInputElement

    fireEvent.change(input, { target: { value: "one piece" } })
    expect(input.value).toBe("one piece")
  })

  it("should clear input when clear button is clicked", () => {
    renderWithProviders({ searchQuery: "naruto" })
    const input = screen.getByPlaceholderText(
      "Search anime...",
    ) as HTMLInputElement
    const clearButton = screen.getByLabelText("clear search")

    fireEvent.click(clearButton)
    expect(input.value).toBe("")
  })
})

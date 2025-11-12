import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import TopAppBar from "../../components/TopAppBar"
import { vi } from "vitest"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from "react-router"
import animeReducer from "../../store/anime/animeSlice"

vi.mock("@mui/icons-material/MovieFilter", () => ({
  default: () => <div data-testid="movie-filter-icon">MovieFilterIcon</div>,
}))

vi.mock("../../components/SearchBar", () => ({
  default: () => <div data-testid="search-bar">SearchBar</div>,
}))

const createMockStore = () => {
  return configureStore({
    reducer: {
      anime: animeReducer,
    },
  })
}

const renderWithProviders = () => {
  const store = createMockStore()
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <TopAppBar />
      </BrowserRouter>
    </Provider>,
  )
}

describe("TopAppBar Component", () => {
  it("should render the app bar", () => {
    renderWithProviders()
    const appBar = screen.getByRole("banner")
    expect(appBar).toBeInTheDocument()
  })

  it("should render the logo icon", () => {
    renderWithProviders()
    const logoIcon = screen.getByTestId("movie-filter-icon")
    expect(logoIcon).toBeInTheDocument()
  })

  it("should render the app name 'AnimeVerse'", () => {
    renderWithProviders()
    const appName = screen.getByText("AnimeVerse")
    expect(appName).toBeInTheDocument()
  })

  it("should render the SearchBar component", () => {
    renderWithProviders()
    const searchBar = screen.getByTestId("search-bar")
    expect(searchBar).toBeInTheDocument()
  })

  it("should have sticky position", () => {
    renderWithProviders()
    const appBar = screen.getByRole("banner")
    expect(appBar).toHaveClass("MuiAppBar-positionSticky")
  })
})

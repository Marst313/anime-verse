import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import NotFoundPage from "../../pages/NotFoundPages"
import { vi, type Mock } from "vitest"
import { BrowserRouter } from "react-router"

// Mock react-router
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router")
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

import { useNavigate } from "react-router"

describe("NotFoundPage", () => {
  const mockNavigate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useNavigate as Mock).mockReturnValue(mockNavigate)
  })

  it("should render 404 title", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    )

    expect(screen.getByText("404")).toBeInTheDocument()
  })

  it("should render error message", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    )

    expect(
      screen.getByText("Oops! The page you looking for doesnt exist."),
    ).toBeInTheDocument()
  })

  it("should render Back to Home button", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    )

    const homeButton = screen.getByRole("button", { name: /back to home/i })
    expect(homeButton).toBeInTheDocument()
  })

  it("should navigate to home page when button is clicked", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    )

    const homeButton = screen.getByRole("button", { name: /back to home/i })
    fireEvent.click(homeButton)

    expect(mockNavigate).toHaveBeenCalledWith("/")
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })

  it("should have proper text styling", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    )

    const title = screen.getByText("404")
    expect(title).toHaveClass("MuiTypography-h2")

    const message = screen.getByText(
      "Oops! The page you looking for doesnt exist.",
    )
    expect(message).toHaveClass("MuiTypography-h5")
  })

  it("should render button with primary color", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    )

    const homeButton = screen.getByRole("button", { name: /back to home/i })
    expect(homeButton).toHaveClass("MuiButton-containedPrimary")
  })

  it("should center all content", () => {
    const { container } = render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    )

    const mainBox = container.firstChild
    expect(mainBox).toHaveStyle({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    })
  })
})

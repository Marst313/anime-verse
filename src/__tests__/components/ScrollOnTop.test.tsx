import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import ScrollOnTop from "../../components/ScrollOnTop"
import { vi, type Mock } from "vitest"

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material")
  return {
    ...actual,
    useScrollTrigger: vi.fn(),
    Zoom: ({ children, in: inProp }: any) => (inProp ? children : null),
    Fab: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  }
})

import { useScrollTrigger } from "@mui/material"

describe("ScrollOnTop Component", () => {
  beforeAll(() => {
    window.scrollTo = vi.fn()
  })

  it("should not render Fab when trigger is false", () => {
    ;(useScrollTrigger as Mock).mockReturnValue(false)

    render(<ScrollOnTop />)
    const button = screen.queryByRole("button", {
      name: /scroll back to top/i,
    })
    expect(button).not.toBeInTheDocument()
  })

  it("should render Fab when trigger is true", () => {
    ;(useScrollTrigger as Mock).mockReturnValue(true)

    render(<ScrollOnTop />)
    const button = screen.getByRole("button", {
      name: /scroll back to top/i,
    })
    expect(button).toBeInTheDocument()
  })

  it("should call window.scrollTo when Fab is clicked", () => {
    ;(useScrollTrigger as Mock).mockReturnValue(true)
    render(<ScrollOnTop />)

    const button = screen.getByRole("button", {
      name: /scroll back to top/i,
    })
    fireEvent.click(button)
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    })
  })
})

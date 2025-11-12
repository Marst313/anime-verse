import { render, screen, fireEvent } from "@testing-library/react"
import BreadCrumbs from "../../components/BreadCrumbs"
import "@testing-library/jest-dom"
import { vi } from "vitest"

describe("BreadCrumbs Component", () => {
  it("renders title when title is provided", () => {
    render(
      <BreadCrumbs
        title="Naruto"
        title_english="Naruto English"
        handleBack={vi.fn()}
      />,
    )
    expect(screen.getByText("Naruto")).toBeInTheDocument()
  })

  it("renders title_english when title is null", () => {
    render(
      <BreadCrumbs
        title={""}
        title_english="Naruto English"
        handleBack={vi.fn()}
      />,
    )
    expect(screen.getByText("Naruto English")).toBeInTheDocument()
  })

  it("calls handleBack when Home link is clicked", () => {
    const mockHandleBack = vi.fn()
    render(
      <BreadCrumbs
        title="Naruto"
        title_english="Naruto English"
        handleBack={mockHandleBack}
      />,
    )
    const homeLink = screen.getByText(/home/i)
    fireEvent.click(homeLink)
    expect(mockHandleBack).toHaveBeenCalled()
  })
})

import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import PaginationComponents from "../../components/Pagination"
import { vi } from "vitest"

describe("PaginationComponents", () => {
  it("renders pagination with correct total pages and current page", () => {
    render(
      <PaginationComponents
        totalPages={5}
        currentPage={2}
        onPageChange={vi.fn()}
      />,
    )
  })

  it("calls onPageChange when a page button is clicked", () => {
    const mockOnPageChange = vi.fn()
    render(
      <PaginationComponents
        totalPages={5}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />,
    )

    const page3Button = screen.getByRole("button", { name: /go to page 3/i })
    fireEvent.click(page3Button)

    expect(mockOnPageChange).toHaveBeenCalledTimes(1)
    expect(mockOnPageChange).toHaveBeenCalledWith(expect.any(Object), 3)
  })

  it("shows first and last buttons", () => {
    render(
      <PaginationComponents
        totalPages={5}
        currentPage={1}
        onPageChange={vi.fn()}
      />,
    )

    expect(
      screen.getByRole("button", { name: /go to first page/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /go to last page/i }),
    ).toBeInTheDocument()
  })

  it("calls onPageChange when first/last buttons are clicked", () => {
    const mockOnPageChange = vi.fn()
    render(
      <PaginationComponents
        totalPages={5}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />,
    )

    const firstButton = screen.getByRole("button", {
      name: /go to first page/i,
    })
    fireEvent.click(firstButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(expect.any(Object), 1)

    const lastButton = screen.getByRole("button", { name: /go to last page/i })
    fireEvent.click(lastButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(expect.any(Object), 5)
  })

  it("calls onPageChange when next/previous buttons are clicked", () => {
    const mockOnPageChange = vi.fn()
    render(
      <PaginationComponents
        totalPages={5}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />,
    )

    const nextButton = screen.getByRole("button", { name: /go to next page/i })
    fireEvent.click(nextButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(expect.any(Object), 4)

    const prevButton = screen.getByRole("button", {
      name: /go to previous page/i,
    })
    fireEvent.click(prevButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(expect.any(Object), 2)
  })
})

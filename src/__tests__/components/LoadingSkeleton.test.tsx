import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import LoadingSkeleton from "../../components/LoadingSkeleton"

describe("LoadingSkeleton Component", () => {
  it("renders grid skeleton by default", () => {
    render(<LoadingSkeleton />)
    const skeletonContainer = screen.getByTestId("loading-skeleton")
    expect(skeletonContainer).toBeInTheDocument()

    const cards = skeletonContainer.querySelectorAll(".MuiCard-root")
    expect(cards.length).toBeGreaterThan(0)
  })

  it("renders correct number of grid skeletons when count prop is passed", () => {
    render(<LoadingSkeleton count={5} />)
    const skeletonContainer = screen.getByTestId("loading-skeleton")
    const cards = skeletonContainer.querySelectorAll(".MuiCard-root")
    expect(cards.length).toBe(5)
  })

  it("renders detail skeleton when variant='detail'", () => {
    render(<LoadingSkeleton variant="detail" />)
  })
})

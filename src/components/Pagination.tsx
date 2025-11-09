import { Pagination } from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import { PaginationWrapper } from "../styles/sharedStyle"

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: theme.palette.common.white,
    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.2)} 0%, ${alpha(theme.palette.background.paper, 0.1)} 100%)`,
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
    fontSize: "1rem",
    fontWeight: 500,
    minWidth: 40,
    height: 40,
    transition: "all 0.2s ease",
    "&:hover": {
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
      transform: "scale(1.05)",
    },
  },
  "& .Mui-selected": {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}) !important`,
    fontWeight: 700,
    border: "none !important",
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
  },
}))

type PaginationProps = {
  totalPages: number
  currentPage: number
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void
}

const PaginationComponents = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <PaginationWrapper>
      <StyledPagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        variant="outlined"
        shape="rounded"
        size="large"
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1}
      />
    </PaginationWrapper>
  )
}

export default PaginationComponents

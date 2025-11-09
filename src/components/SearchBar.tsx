import { useEffect, useState, useCallback, useRef } from "react"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import {
  alpha,
  InputBase,
  styled,
  CircularProgress,
  IconButton,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setSearchQuery, setPage } from "../store/anime/animeSlice"
import { useSearchParams } from "react-router"

const GlassSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 16,
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.2)} 0%, ${alpha(theme.palette.background.paper, 0.1)} 100%)`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  marginLeft: 0,
  width: "100%",
  "&:hover": {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
    boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
    transform: "translateY(-2px)",
  },
  "&:focus-within": {
    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.25)} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`,
    boxShadow: `0 0 30px ${alpha(theme.palette.secondary.main, 0.5)}`,
    border: `1px solid ${alpha(theme.palette.secondary.main, 0.6)}`,
    transform: "translateY(-2px) scale(1.02)",
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.secondary.light,
  zIndex: 1,
}))

const ClearButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: "50%",
  transform: "translateY(-50%)",
  padding: theme.spacing(0.5),
  color: alpha(theme.palette.common.white, 0.7),
  transition: "all 0.2s ease",
  "&:hover": {
    color: theme.palette.common.white,
    backgroundColor: alpha(theme.palette.error.main, 0.2),
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.white,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    fontSize: "0.95rem",
    fontWeight: 500,
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "40ch",
      },
    },
    "&::placeholder": {
      color: alpha(theme.palette.common.white, 0.7),
      opacity: 1,
    },
  },
}))

const SearchBar = () => {
  const dispatch = useAppDispatch()
  const { searchQuery, isLoading } = useAppSelector(state => state.anime)
  const [, setSearchParams] = useSearchParams()

  const [inputValue, setInputValue] = useState(searchQuery)

  const isMountedRef = useRef(true)

  const abortControllerRef = useRef<AbortController | null>(null)

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedSearch = useCallback(
    (query: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      debounceTimerRef.current = setTimeout(() => {
        if (!isMountedRef.current) return
        abortControllerRef.current = new AbortController()
        dispatch(setSearchQuery(query))
      }, 250)
    },
    [dispatch],
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setSearchParams({ s: value })
    debouncedSearch(value)
  }

  const handleClear = () => {
    setInputValue("")
    dispatch(setSearchQuery(""))
    setSearchParams({ s: "" })
    dispatch(setPage(1))
  }

  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return (
    <GlassSearch>
      <SearchIconWrapper>
        {isLoading ? (
          <CircularProgress size={20} sx={{ color: "secondary.light" }} />
        ) : (
          <SearchIcon />
        )}
      </SearchIconWrapper>

      <StyledInputBase
        placeholder="Search anime..."
        inputProps={{ "aria-label": "search anime" }}
        value={inputValue}
        onChange={handleInputChange}
      />

      {inputValue && (
        <ClearButton
          size="small"
          onClick={handleClear}
          aria-label="clear search"
        >
          <CloseIcon fontSize="small" />
        </ClearButton>
      )}
    </GlassSearch>
  )
}
export default SearchBar

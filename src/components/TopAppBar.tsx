import { styled, alpha } from "@mui/material/styles"
import { Box, Container, Toolbar, Typography } from "@mui/material"
import MovieFilterIcon from "@mui/icons-material/MovieFilter"

import { GlassAppBar } from "../styles/sharedStyle"
import SearchBar from "./SearchBar"

const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  padding: theme.spacing(1, 2),
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`,
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.25)} 0%, ${alpha(theme.palette.secondary.main, 0.25)} 100%)`,
    boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
    transform: "translateY(-2px)",
  },
}))

const LogoIcon = styled(MovieFilterIcon)(({ theme }) => ({
  fontSize: 32,
  filter: `drop-shadow(0 4px 12px ${alpha(theme.palette.secondary.main, 0.5)})`,
  color: theme.palette.secondary.light,
}))

const TopAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <GlassAppBar position="sticky" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1 }}>
            <LogoBox sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
              <LogoIcon />
              <Typography variant="h5">AnimeVerse</Typography>
            </LogoBox>

            <SearchBar />
          </Toolbar>
        </Container>
      </GlassAppBar>
    </Box>
  )
}

export default TopAppBar

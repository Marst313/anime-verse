import { styled, alpha } from "@mui/material/styles"
import {
  Box,
  Chip,
  IconButton,
  AppBar,
  Breadcrumbs,
  Button,
} from "@mui/material"
import type { Theme } from "@mui/material/styles"

export const GlassContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.05)} 100%)`,
  backdropFilter: "blur(10px) saturate(180%)",
  WebkitBackdropFilter: "blur(10px) saturate(180%)",
  border: `1px solid ${alpha(theme.palette.common.white, 0.125)}`,
  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.37)}`,
  borderRadius: 20,
}))

export const GlassContainerHover = styled(GlassContainer)(({ theme }) => ({
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
    boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
    transform: "translateY(-2px)",
  },
}))

export const GlassChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.common.white,
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.2)} 0%, ${alpha(theme.palette.background.paper, 0.1)} 100%)`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
  fontSize: "0.875rem",
  fontWeight: 500,
  height: 40,
  transition: "all 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
    transform: "scale(1.05)",
  },
  "&.selected": {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}) !important`,
    fontWeight: 700,
    border: "none !important",
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
  },
}))

export const GradientChip = styled(Chip)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.25)}, ${alpha(theme.palette.secondary.main, 0.25)})`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
  color: theme.palette.common.white,
  fontWeight: 600,
  fontSize: "0.7rem",
  height: 24,
}))

export const GenreChip = styled(Chip)(({ theme }) => ({
  fontSize: "0.65rem",
  height: 20,
  background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  color: theme.palette.secondary.light,
  border: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
  fontWeight: 500,
}))

export const CountChip = styled(Chip)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  fontWeight: 700,
  height: 28,
  fontSize: "0.75rem",
  border: "none",
  boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.4)}`,
  "& .MuiChip-label": {
    padding: "0 10px",
  },
}))

export const GlassIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.2)} 0%, ${alpha(theme.palette.background.paper, 0.1)} 100%)`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
  width: 40,
  height: 40,
  transition: "all 0.2s ease",
  "&:hover": {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
    transform: "scale(1.05)",
  },
  "&.clear-button": {
    marginRight: (theme: Theme) => theme.spacing(1),
    "&:hover": {
      background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.3)} 0%, ${alpha(theme.palette.error.main, 0.2)} 100%)`,
      border: `1px solid ${alpha(theme.palette.error.main, 0.5)}`,
    },
  },
}))

export const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.05)} 100%)`,
  backdropFilter: "blur(10px) saturate(180%)",
  WebkitBackdropFilter: "blur(10px) saturate(180%)",
  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.37)}`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.125)}`,
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
}))

export const GlassBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.paper, 0.4)} 100%)`,
  backdropFilter: "blur(10px) saturate(180%)",
  WebkitBackdropFilter: "blur(10px) saturate(180%)",
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  borderRadius: 12,
  marginBottom: theme.spacing(3),
  "& .MuiBreadcrumbs-separator": {
    color: alpha(theme.palette.common.white, 0.5),
  },
}))

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2.5),
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
}))

export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(10, 2),
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.05)} 100%)`,
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: 16,
  border: `1px solid ${alpha(theme.palette.common.white, 0.125)}`,
  margin: theme.spacing(4, 0),
}))

export const PaginationWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3, 2),
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.05)} 100%)`,
  backdropFilter: "blur(10px) saturate(180%)",
  WebkitBackdropFilter: "blur(10px) saturate(180%)",
  borderRadius: 20,
  border: `1px solid ${alpha(theme.palette.common.white, 0.125)}`,
  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.37)}`,
}))

export const ActionButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.paper, 0.4)} 100%)`,
  backdropFilter: "blur(10px) saturate(180%)",
  WebkitBackdropFilter: "blur(10px) saturate(180%)",
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  borderRadius: 12,
  padding: "12px 32px",
  color: "rgba(255, 255, 255, 0.95)",
  fontWeight: 600,
  fontSize: "1rem",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.4)} 0%, ${alpha(theme.palette.primary.main, 0.3)} 100%)`,
    transform: "translateY(-2px)",
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
  },
}))

export const GlassBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.paper, 0.4)} 100%)`,
  backdropFilter: "blur(10px) saturate(180%)",
  WebkitBackdropFilter: "blur(10px) saturate(180%)",
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  borderRadius: 16,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}))

export const GlassButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.paper, 0.4)} 100%)`,
  backdropFilter: "blur(10px) saturate(180%)",
  WebkitBackdropFilter: "blur(10px) saturate(180%)",
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  borderRadius: 12,
  padding: "10px 24px",
  color: "rgba(255, 255, 255, 0.95)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
    transform: "translateY(-2px)",
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
  },
}))

export const StatsChip = styled(Box)<{ color?: string }>(({ theme, color }) => {
  const chipColor = color ?? theme.palette.primary.main
  return {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(1.5, 2.5),
    background: `linear-gradient(135deg, ${alpha(chipColor, 0.2)} 0%, ${alpha(chipColor, 0.1)} 100%)`,
    backdropFilter: "blur(8px) saturate(180%)",
    WebkitBackdropFilter: "blur(8px) saturate(180%)",
    border: `1px solid ${alpha(chipColor, 0.3)}`,
    borderRadius: 12,
    transition: "all 0.3s ease",
    "&:hover": {
      background: `linear-gradient(135deg, ${alpha(chipColor, 0.3)} 0%, ${alpha(chipColor, 0.2)} 100%)`,
      transform: "translateY(-2px)",
      boxShadow: `0 4px 16px ${alpha(chipColor, 0.4)}`,
    },
  }
})

export const InfoCard = styled(GlassBox)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  height: "100%",
}))

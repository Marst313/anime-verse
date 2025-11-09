import { Typography, Link } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import { GlassBreadcrumbs } from "../styles/sharedStyle"

interface BreadCrumbsProps {
  title_english: string | null
  title: string
  handleBack: () => void
}

const BreadCrumbs = ({
  title_english,
  title,
  handleBack,
}: BreadCrumbsProps) => {
  return (
    <GlassBreadcrumbs aria-label="breadcrumb">
      <Link
        onClick={handleBack}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          cursor: "pointer",
          textDecoration: "none",
          color: "rgba(255, 255, 255, 0.7)",
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <HomeIcon sx={{ fontSize: 20 }} />
        Home
      </Link>
      <Typography sx={{ color: "rgba(255, 255, 255, 0.95)" }}>
        {title || title_english}
      </Typography>
    </GlassBreadcrumbs>
  )
}

export default BreadCrumbs

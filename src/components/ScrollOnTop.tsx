import { useEffect, useState } from "react"
import { Fab, useScrollTrigger, Zoom } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

const ScrollOnTop = () => {
  const [visible, setVisible] = useState(false)

  const trigger = useScrollTrigger({
    threshold: 50,
    disableHysteresis: true,
  })

  useEffect(() => {
    setVisible(trigger)
  }, [trigger])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Zoom in={visible}>
      <Fab
        color="primary"
        size="medium"
        onClick={handleScrollTop}
        aria-label="scroll back to top"
        sx={{
          position: "fixed",
          bottom: { xs: 24, sm: 32 },
          right: { xs: 24, sm: 32 },
          zIndex: 1200,
          boxShadow: 4,
          "&:hover": {
            boxShadow: 6,
            transform: "scale(1.08)",
            transition: "all 0.2s ease",
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  )
}

export default ScrollOnTop

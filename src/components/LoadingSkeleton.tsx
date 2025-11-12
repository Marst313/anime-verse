import {
  Container,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Box,
  Stack,
} from "@mui/material"

type LoadingSkeletonProps = {
  variant?: "grid" | "detail"
  count?: number
}

const LoadingSkeleton = ({
  variant = "grid",
  count = 12,
}: LoadingSkeletonProps) => {
  if (variant === "detail") {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Skeleton
            variant="rounded"
            width={120}
            height={40}
            animation="wave"
            sx={{
              borderRadius: 2,
              bgcolor: "rgba(255, 255, 255, 0.05)",
            }}
          />
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                position: "relative",
                aspectRatio: "2 / 3",
                borderRadius: 4,
                overflow: "hidden",
                bgcolor: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton
              variant="text"
              width="70%"
              height={48}
              animation="wave"
              sx={{ mb: 2 }}
            />
            <Skeleton
              variant="text"
              width="50%"
              height={32}
              animation="wave"
              sx={{ mb: 4 }}
            />

            <Stack
              direction="row"
              spacing={2}
              sx={{ mb: 4, flexWrap: "wrap", gap: 2 }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={120}
                  height={40}
                  animation="wave"
                  sx={{ borderRadius: 3 }}
                />
              ))}
            </Stack>

            <Skeleton
              variant="text"
              width="30%"
              height={32}
              animation="wave"
              sx={{ mb: 2 }}
            />

            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                width={i === 4 ? "60%" : "100%"}
                height={24}
                animation="wave"
                sx={{ mb: 1 }}
              />
            ))}

            <Skeleton
              variant="text"
              width="25%"
              height={32}
              animation="wave"
              sx={{ mt: 4, mb: 2 }}
            />

            <Stack
              direction="row"
              spacing={1}
              sx={{ flexWrap: "wrap", gap: 1 }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={80}
                  height={32}
                  animation="wave"
                  sx={{ borderRadius: 3 }}
                />
              ))}
            </Stack>

            <Skeleton
              variant="text"
              width="25%"
              height={32}
              animation="wave"
              sx={{ mt: 4, mb: 1 }}
            />
            <Skeleton variant="text" width="40%" height={24} animation="wave" />
          </Grid>
        </Grid>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }} data-testid="loading-skeleton">
      <Grid container spacing={3}>
        {Array.from({ length: count }).map((_, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "background.paper",
                boxShadow: 2,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  aspectRatio: "3 / 4",
                  width: "100%",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  animation="wave"
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 48,
                    height: 20,
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.1)",
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Skeleton
                  variant="text"
                  width="80%"
                  height={24}
                  animation="wave"
                  sx={{ mb: 0.5 }}
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  height={20}
                  animation="wave"
                  sx={{ mb: 2 }}
                />

                <Stack direction="row" spacing={1} mb={1.5}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="rounded"
                      width={50}
                      height={24}
                      animation="wave"
                    />
                  ))}
                </Stack>

                <Stack
                  direction="row"
                  spacing={0.75}
                  flexWrap="wrap"
                  useFlexGap
                >
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="rounded"
                      width={60}
                      height={20}
                      animation="wave"
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default LoadingSkeleton

export const genresToString = (genres?: number[]): string | undefined => {
  if (!genres || genres.length === 0) return undefined
  return genres.join(",")
}

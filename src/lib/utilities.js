export function countGoodShares(shares) {
  return shares.filter((s) => !s.error).length
}

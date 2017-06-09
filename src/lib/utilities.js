export function countGoodShares(shares) {
  return shares.filter((s) => !s.error).length;
}

export function sharesMismatched(shares) {
  if (!shares || shares.length === 0) {
    return false;
  }

  let firstGroup;
  return !shares.every((share) => {
    if (share.group === undefined) {
      return true;
    }

    if (firstGroup === undefined) {
      firstGroup = share.group;
    }

    return firstGroup === share.group;
  });
}

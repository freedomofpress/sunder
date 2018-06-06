import { parseShare } from 'src/lib/crypto';


export function countGoodShares(shares) {
  return shares.filter((s) => !s.error).length;
}

export function countBadShares(shares) {
  return shares.filter((s) => s.error).length;
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

export function validateShare(newShare, existingShares) {
  const parsedShare = parseShare(newShare);

  const parsedShares = existingShares.map((s) => parseShare(s.data));

  if (!Number.isInteger(parsedShare.quorum) || !Number.isInteger(parsedShare.shareNum)) {
    return { error: 'MALFORMED' };
  }

  if (parsedShares.some((s) => s.shareNum === parsedShare.shareNum)) {
    return { error: 'DUPLICATE' };
  }

  return { error: false, parsedShare };
}

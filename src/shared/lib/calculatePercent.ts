import { TUrlDto } from "../types";

export const calculatePercent = (urls: TUrlDto[]) => {
  const relevantsCount = urls.reduce((acc, itm) => {
    if (itm.is_relevant) {
      acc += 1;
    }

    return acc;
  }, 0);

  const amountCount = urls.length;

  return Math.round((relevantsCount / amountCount) * 100);
};

import { TUrlDto } from "../types";

export const getTitledObjectsArray = (text: string, urls: TUrlDto[]) => {
  return text
    .split("\n")
    .slice(2)
    .map((item) => {
      // eslint-disable-next-line no-useless-escape
      const parts = item.replace(/^\*\s+\"/, "").split(/"\s+-\s+/);

      const restParts = parts[1].split(/\s+-\s+/);

      return {
        [parts[0]]: {
          id: urls.find((itm) => itm.title === parts[0])?.id,
          is_relevant: restParts[0] === "да" ? 1 : 0,
          description: restParts[1],
        },
      };
    });
};

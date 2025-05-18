import { useState } from "react";
import { TBaseDto } from "../types";

interface Props {
  url: string;
  method?: "POST" | "PUT" | "PATCH";
}

export const useMutationRequest = <Request, Response>({
  url,
  method = "POST",
}: Props) => {
  const [isMutating, setIsMutating] = useState(false);

  const mutationRequest = async (value: Request) => {
    setIsMutating(true);
    let data: TBaseDto<Response> | undefined = undefined;
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(value),
      });
      data = await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setIsMutating(false);
    }
    return data;
  };

  return { mutationRequest, isMutating };
};

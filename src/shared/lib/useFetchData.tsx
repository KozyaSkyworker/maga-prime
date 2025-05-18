import { useEffect, useState } from "react";

interface Props {
  url: string;
}

export const useFetchData = <T,>({ url }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          headers: {
            "Content-type": "application/json",
          },
        });
        const data: T = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [url]);

  return { data, isLoading };
};

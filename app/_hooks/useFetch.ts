import { useCallback, useEffect, useState } from "react";

export function useFetch<T>(url: string, default_value: T) {
  const [data, setData] = useState<T>(default_value);
  const [loading, setLoading] = useState(true);

  const fetchUrl = useCallback(async function() {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json as T);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [url])

  useEffect(() => {
    fetchUrl();
  }, []);

  return { data, loading };
}

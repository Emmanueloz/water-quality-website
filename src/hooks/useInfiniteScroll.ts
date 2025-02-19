import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect, useRef, useState } from "react";

export function useInfiniteScroll<T>(
  fetchData: (page: number) => Promise<T[]>,
  initialPage: number = 1
) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const { userProfile } = useContext(AuthContext);

  async function loadMoreData() {
    if (!userProfile || isLoading || !hasMore) return;

    setIsLoading(true);
    const newData = await fetchData(page);

    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setItems((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    let isMounted = false;

    if (!userProfile || items.length > 0 || !isMounted) return;

    loadMoreData();
    return () => {
      isMounted = true;
    };
  }, [userProfile]);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      },
      { threshold: 1 }
    );

    if (lastItemRef.current) observer.current.observe(lastItemRef.current);

    return () => observer.current?.disconnect();
  }, [hasMore, isLoading]);

  return { items, isLoading, hasMore, lastItemRef, setHasMore, setItems };
}

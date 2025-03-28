import { AuthContext } from "@/context/AuthProvider";
import { use, useContext, useEffect, useRef, useState } from "react";

export function useInfiniteScroll<T>(
  fetchData: (page: number, userProfile: UserProfile) => Promise<T[]>,
  initialPage: number = 1
) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { userProfile } = useContext(AuthContext);

  async function loadMoreData() {
    if (!userProfile || isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const newData = await fetchData(page, userProfile);

      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...newData]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (!userProfile || !isMounted) return;

    loadMoreData();
  }, [userProfile, isMounted]); // Se ejecuta una vez cuando el usuario está definido

  function cleanState() {
    setItems([]);
    setHasMore(true);
    setIsLoading(false);
    setPage(initialPage);
    setIsMounted(false);
    observer.current?.disconnect();
    observer.current = null;
    lastItemRef.current = null;
  }

  useEffect(() => {
    if (!hasMore || isLoading || !lastItemRef.current || !isMounted) return;

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
  }, [items, hasMore, isLoading]); // Se reactiva cada vez que cambia la cantidad de elementos

  return {
    items,
    isLoading,
    hasMore,
    lastItemRef,
    isMounted,
    setHasMore,
    setItems,
    setIsMounted,
    cleanState,
  };
}

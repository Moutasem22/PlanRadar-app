import React, { useState, useRef, ReactNode } from "react";

type Props<T> = {
  visibleRowPerPage: number;
  cardHeight: number;
  data: T[];
  itemContent: (index: number, item: T) => ReactNode;
  loadingFooter?: ReactNode;
  onUpdateCurrentView?: (count: number) => void;
};

export const InfiniteScrollWrapper = <T,>({
  data,
  cardHeight,
  loadingFooter,
  visibleRowPerPage,
  itemContent,
  onUpdateCurrentView,
}: Props<T>) => {
  const [visibleData, setVisibleData] = useState<T[]>(
    data.slice(0, visibleRowPerPage)
  );
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreItems = () => {
    if (isLoading || page * visibleRowPerPage === data?.length) return;
    setIsLoading(true);

    setTimeout(() => {
      const nextPage = page + 1;
      const newVisibleData = data.slice(0, nextPage * visibleRowPerPage);
      setVisibleData(newVisibleData);
      setPage(nextPage);
      setIsLoading(false);
      onUpdateCurrentView?.(nextPage * visibleRowPerPage);
    }, 500);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - cardHeight) loadMoreItems();
  };

  return (
    <div
      onScroll={handleScroll}
      className="infinite-scroll-list"
      style={{
        height: `${visibleRowPerPage * cardHeight}px`,
        overflowY: "auto",
      }}
    >
      {visibleData.map((item, index) => (
        <div key={index}>{itemContent(index, item)}</div>
      ))}
      {isLoading && loadingFooter}
    </div>
  );
};

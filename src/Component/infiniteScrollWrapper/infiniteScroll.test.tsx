import { render, fireEvent, screen } from "@testing-library/react";
import { InfiniteScrollWrapper } from ".";

describe("InfiniteScrollWrapper", () => {
  const mockData = Array.from(
    { length: 100 },
    (_, index) => `Item ${index + 1}`
  );

  const itemContentMock = (_index: number, item: string) => (
    <div style={{ height: "50px" }}>{item}</div>
  );

  test("renders initial visible rows correctly", () => {
    render(
      <InfiniteScrollWrapper
        visibleRowPerPage={10}
        cardHeight={50}
        data={mockData}
        itemContent={itemContentMock}
      />
    );
    mockData.slice(0, 10).forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("loads more data on scroll", () => {
    const { container } = render(
      <InfiniteScrollWrapper
        visibleRowPerPage={20}
        cardHeight={50}
        data={mockData}
        itemContent={itemContentMock}
      />
    );

    const scrollContainer = container.querySelector(".infinite-scroll-list");
    fireEvent.scroll(scrollContainer!, { target: { scrollTop: 500 } });

    mockData.slice(0, 20).forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("displays loading footer when fetching more items", () => {
    render(
      <InfiniteScrollWrapper
        visibleRowPerPage={10}
        cardHeight={50}
        data={mockData}
        itemContent={itemContentMock}
        loadingFooter={<div>Loading more items...</div>}
      />
    );

    const loadingElement = screen.queryByText("Loading more items...");
    expect(loadingElement).not.toBeInTheDocument();

    const { container } = render(
      <InfiniteScrollWrapper
        visibleRowPerPage={10}
        cardHeight={50}
        data={mockData}
        itemContent={itemContentMock}
        loadingFooter={<div>Loading more items...</div>}
      />
    );
    const scrollContainer = container.querySelector(".infinite-scroll-list");
    fireEvent.scroll(scrollContainer!, { target: { scrollTop: 500 } });

    expect(screen.getByText("Loading more items...")).toBeInTheDocument();
  });
});

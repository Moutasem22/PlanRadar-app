import { render, screen } from "@testing-library/react";
import { Ticket } from "../../Types";
import { List, ListFieldMap } from ".";

describe("List Component", () => {
  const mockColumns: ListFieldMap[] = [
    { label: "Subject", field: "subject" },
    { label: "Description", field: "description" },
    { label: "Priority", field: "priority" },
    { label: "Status", field: "status" },
  ];

  const mockData: Ticket[] = [
    {
      id: "1",
      subject: "Ticket 1",
      description: "Description 1",
      priority: "High",
      status: "Open",
    },
    {
      id: "2",
      subject: "Ticket 2",
      description: "Description 2",
      priority: "Medium",
      status: "Closed",
    },
  ];

  test("renders list headers correctly", () => {
    render(<List columns={mockColumns} data={mockData} />);
    mockColumns.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("renders ticket data correctly", () => {
    render(<List columns={mockColumns} data={mockData} />);
    mockData.forEach((ticket) => {
      expect(screen.getByText(ticket.subject)).toBeInTheDocument();
      expect(screen.getByText(ticket.description)).toBeInTheDocument();
      expect(screen.getByText(ticket.priority)).toBeInTheDocument();
      expect(screen.getByText(ticket.status)).toBeInTheDocument();
    });
  });

  test("applies gridTemplateColumns style correctly", () => {
    const { container } = render(
      <List
        columns={mockColumns}
        data={mockData}
        gridTemplateColumns="1fr 2fr"
      />
    );
    const headerRow = container.querySelector(".header");
    expect(headerRow).toHaveStyle("grid-template-columns: 1fr 2fr");
  });
});

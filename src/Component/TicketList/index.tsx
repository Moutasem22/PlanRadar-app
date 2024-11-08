import "./style.scss";
import { List } from "../List";
import { Ticket } from "../../Types";

export const TicketsList = () => {
  const priority = ["Low", "Medium", "High"];
  const status = ["Open", "In Progress", "Closed"];
  const data: Ticket[] = Array.from({ length: 10000 }, (_, index) => ({
    id: `${index} + 1`,
    subject: `Ticket ${index + 1}`,
    priority: priority[Math.floor(Math.random() * 3)],
    status: status[Math.floor(Math.random() * 3)],
    description: `This a description for ticket ${index + 1}`,
  }));

  return (
    <div className="container">
      <h2>Tasks</h2>
      <List
        gridTemplateColumns="1.5fr 2.5fr repeat(2, 1fr)"
        data={data}
        columns={[
          {
            label: "Subject",
            field: "subject",
          },
          {
            label: "Description",
            field: "description",
          },
          {
            label: "Status",
            field: "status",
          },
          {
            label: "Priority",
            field: "priority",
          },
        ]}
      />
    </div>
  );
};

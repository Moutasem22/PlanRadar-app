import "./style.scss";
import { InfiniteScrollWrapper } from "../infiniteScrollWrapper";
import { Ticket } from "../../Types";

export type Props = {
  data: Ticket[];
  columns: ListFieldMap[];
  gridTemplateColumns?: string;
};

export type ListFieldMap = {
  label: string;
  field: keyof Ticket;
  classes?: string;
  style?: any;
};

export const List = ({ columns, data, gridTemplateColumns }: Props) => {
  const gridColumns = gridTemplateColumns || `repeat(${columns.length}, 1fr)`;

  const generateRowData = (record: Ticket) => (
    <div
      key={record.id}
      id={record.id}
      className="row data"
      style={{ gridTemplateColumns: gridColumns }}
    >
      {columns.map(({ label, field, style, classes }) => (
        <div
          key={`list-${record.id}-${label}`}
          className={`cell ${record[field!]?.replace(" ", "")}`}
          style={style}
        >
          <span>{record[field!]} </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="list-wrapper">
      <div className="list">
        <div
          className="row header"
          style={{ gridTemplateColumns: gridColumns }}
        >
          {columns.map(({ label, style }: any) => (
            <div
              className="cell"
              key={`header-cell-name-${label}`}
              style={style}
            >
              {label}
            </div>
          ))}
        </div>

        <InfiniteScrollWrapper
          visibleRowPerPage={10}
          cardHeight={50}
          data={data}
          itemContent={(_index: number, record: Ticket) => {
            return generateRowData(record);
          }}
          loadingFooter={
            <div style={{ padding: "10px", textAlign: "center" }}>
              Loading more items...
            </div>
          }
        />
      </div>
    </div>
  );
};
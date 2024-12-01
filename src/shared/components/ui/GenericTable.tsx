import {
  Table,
  TableBody,
  TableBodyProps,
  TableColumn,
  TableHeader,
  TableProps,
} from "@nextui-org/react";
import React from "react";

import { TableLoading } from "@shared/components/ui/TableLoading.tsx";

type GenericTableProps<T> = Omit<TableProps, "children"> & {
  children: (item: T) => React.ReactElement;
  columns: { key: string; label: string; width?: number }[];
  items: T[];
  tableBodyProps?: GenericTableBodyProps<T>;
};

type GenericTableBodyProps<T> = Omit<TableBodyProps<T>, "items" | "children">;

export function GenericTable<T>(props: GenericTableProps<T>) {
  const { columns, items, tableBodyProps, ...rest } = props;

  return (
    <Table {...rest}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} width={column.width}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items} loadingContent={<TableLoading />} {...tableBodyProps}>
        {(item) => props.children(item)}
      </TableBody>
    </Table>
  );
}

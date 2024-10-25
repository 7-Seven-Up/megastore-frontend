import React from "react";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import {
  AVAILABLE_TABLE_ACTIONS,
  TableActions,
} from "@shared/interfaces/table-actions.interface.ts";
import { EditDeleteActions } from "@shared/components/ui/EditDeleteActions.tsx";
import { RestoreActions } from "@shared/components/ui/RestoreActions.tsx";
import { Size } from "@sizes/interfaces/responses/size.interface.ts";
import { SizeResponse } from "@sizes/interfaces/responses/size-response.interface.ts";

const columns = [
  {
    key: "actions",
    label: "ACTIONS",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
];

interface SizesTableProps {
  bottomContent: React.ReactNode;
  isLoading: boolean;
  sizes?: SizeResponse;
  tableActionsProps: TableActions<Size, string>;
}

export function SizesTable({
  bottomContent,
  isLoading,
  sizes,
  tableActionsProps,
}: SizesTableProps) {
  return (
    <>
      <Table aria-label="List of sizes" bottomContent={bottomContent}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"There are no sizes to show"}
          items={sizes?.content || []}
          loadingContent={
            <div
              className={
                "flex h-full w-full flex-col items-center justify-center gap-2 bg-default p-4"
              }
            >
              <Spinner />
            </div>
          }
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(size) => (
            <TableRow key={size.sizeId}>
              <TableCell>
                {tableActionsProps.type === AVAILABLE_TABLE_ACTIONS.RESTORE && (
                  <RestoreActions
                    onRestore={() => tableActionsProps.onRestore(size.sizeId)}
                    toolTipContent={"Restore size"}
                  />
                )}

                {tableActionsProps.type ===
                  AVAILABLE_TABLE_ACTIONS.EDIT_DELETE && (
                  <EditDeleteActions
                    deleteContent={"Delete size"}
                    editContent={"Edit size"}
                    onDelete={() => tableActionsProps.onDelete(size.sizeId)}
                    onEdit={() => tableActionsProps.onEdit(size)}
                    confirmModalProps={{
                      title: "Delete size",
                      description: `Are you sure you want to delete the size ${size.name}?`,
                    }}
                    allowEdit
                    allowDelete
                  />
                )}
              </TableCell>
              <TableCell>{size.name}</TableCell>
              <TableCell>
                <span
                  className={`${!size.description ? "text-content4-foreground" : ""}`}
                >
                  {size.description || "No description"}
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

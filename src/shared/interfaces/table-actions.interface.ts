export enum AVAILABLE_TABLE_ACTIONS {
  EDIT_DELETE = "EDIT_DELETE",
  RESTORE = "RESTORE",
}

export type TableActions<T, Y> =
  | EditDeleteActionsProps<T, Y>
  | RestoreActionsProps<Y>;

export type EditDeleteActionsProps<T, Y> = {
  type: AVAILABLE_TABLE_ACTIONS.EDIT_DELETE;
  onEdit: (item: T) => void;
  onDelete: (id: Y) => Promise<void>;
};

export type RestoreActionsProps<T> = {
  type: AVAILABLE_TABLE_ACTIONS.RESTORE;
  onRestore: (id: T) => void;
};

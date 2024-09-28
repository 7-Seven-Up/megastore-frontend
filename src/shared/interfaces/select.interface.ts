import { Control, FieldValues } from "react-hook-form";
import { SelectProps } from "@nextui-org/react";

export interface Select<T extends FieldValues>
  extends Omit<SelectProps, "items" | "children" | "isRequired"> {
  control: Control<T>;
}

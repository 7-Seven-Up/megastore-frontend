import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from "react-hook-form";
import { Select, SelectProps } from "@nextui-org/react";
import React from "react";

type ControlledSelectProps<T extends FieldValues> = Omit<
  ControllerProps,
  "render" | "control"
> &
  Omit<SelectProps, "children"> & {
    items: T[];
    children: (item: T) => React.ReactElement;
    control: Control<any>;
  };

export function ControlledSelect<T extends FieldValues>(
  props: ControlledSelectProps<T>,
) {
  const controllerProps = {
    control: props.control,
    name: props.name,
    rules: props.rules,
  };

  return (
    <Controller
      render={({ fieldState, field }) => (
        <Select
          className={"w-full"}
          errorMessage={fieldState.error?.message}
          isInvalid={fieldState.invalid}
          {...props}
          {...field}
        >
          {props.items.map((item) => {
            return props.children(item);
          })}
        </Select>
      )}
      {...controllerProps}
    />
  );
}

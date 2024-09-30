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

  const {
    items: { length },
  } = props;

  return (
    <Controller
      render={({ fieldState, field }) => (
        <Select
          className={"w-full"}
          errorMessage={fieldState.error?.message}
          isInvalid={fieldState.invalid}
          classNames={{
            selectorIcon: `${length > 0 ? "block" : "hidden"}`,
            trigger: `${length > 0 ? "cursor-pointer" : "cursor-not-allowed"}`,
          }}
          {...props}
          {...field}
          placeholder={`${length > 0 ? props.label : "No items available"}`}
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

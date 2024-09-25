import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function useZodForm<T extends ZodType>(
  schema: T,
  options?: Omit<UseFormProps<z.infer<T>>, "resolver">,
): UseFormReturn<z.infer<T>> {
  return useForm<z.infer<T>>({
    ...options,
    resolver: zodResolver(schema),
  });
}

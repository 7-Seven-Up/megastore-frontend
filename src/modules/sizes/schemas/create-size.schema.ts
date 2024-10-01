import { z } from "zod";
import { optionalToNull } from "@/shared/utils/optionalToNull.ts";

export const CreateSizeSchema = z.object({
  name: z
    .string({
      required_error: "",
    })
    .max(20, {
      message: "Name must be less than 20 characters",
    }),
  description: z
    .string()
    .max(50, {
      message: "Description must be less than 50 characters",
    })
    .optional()
    .transform(optionalToNull),
});

export type CreateSizeSchemaType = z.infer<typeof CreateSizeSchema>;

import { z } from "zod";

export const CreateSizeSchema = z.object({
  name: z
    .string({
      required_error: "",
    })
    .min(1, {
      message: "Name must be at least 1 character",
    })
    .max(20, {
      message: "Name must be less than 20 characters",
    }),
  description: z
    .string()
    .max(50, {
      message: "Description must be less than 50 characters",
    })
    .optional(),
});

export type CreateSizeSchemaType = z.infer<typeof CreateSizeSchema>;

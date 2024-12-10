import { z } from "zod";

export const UpdateSizeSchema = z.object({
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
    .min(5, {
      message: "Description must be at least 5 characters",
    })
    .max(50, {
      message: "Description must be less than 50 characters",
    })
    .optional(),
});

export type UpdateSizeSchemaType = z.infer<typeof UpdateSizeSchema>;

import { z } from "zod";

export const UpdateCategorySchema = z.object({
  name: z
    .string({
      required_error: "",
    })
    .min(1, {
      message: "Name is required",
    })
    .max(20, {
      message: "Name must be less than 20 characters",
    }),
  description: z
    .string({
      required_error: "",
    })
    .max(50, {
      message: "Description must be less than 50 characters",
    }),
  superCategoryId: z.string().optional().nullable(),
});

export type UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>;

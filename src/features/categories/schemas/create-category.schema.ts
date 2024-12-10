import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z
    .string({
      required_error: "",
    })
    .min(3, {
      message: "Name must be at least 3 characters",
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
  superCategoryId: z.string().optional(),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;

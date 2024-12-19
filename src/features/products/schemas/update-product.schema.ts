import { z } from "zod";

export const UpdateProductSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "The product name must be at least 3 characters long",
    })
    .max(30, {
      message: "The product name must be at most 30 characters long",
    }),
  description: z.string().max(80, {
    message: "The product description must be at most 80 characters long",
  }),
  price: z
    .number({
      coerce: true,
    })
    .min(0, {
      message: "The product price must be greater than 0",
    }),
  categoryId: z.string({
    required_error: "The product category is required",
  }),
  variantOfId: z.string().optional(),
});

export type UpdateProductSchemaType = z.infer<typeof UpdateProductSchema>;

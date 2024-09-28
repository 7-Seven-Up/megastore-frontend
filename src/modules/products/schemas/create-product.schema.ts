import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z
    .string({
      required_error: "",
    })
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(30, {
      message: "Name must be less than 30 characters.",
    }),
  description: z
    .string({
      required_error: "",
    })
    .min(5, {
      message: "Description must be at least 5 characters",
    })
    .max(80, {
      message: "Description must be less than 80 characters.",
    }),
  stock: z
    .number({
      coerce: true,
      message: "",
      required_error: "",
    })
    .min(0, {
      message: "Stock must be positive.",
    }),
  price: z
    .number({
      coerce: true,
      message: "",
      required_error: "",
    })
    .min(0, {
      message: "Price must be positive.",
    }),
  color: z
    .string({
      required_error: "",
    })
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: "Color must be a valid hex color.",
    }),
  sizeId: z
    .string({
      required_error: "",
    })
    .min(1, {
      message: "",
    }),
  categoryId: z
    .string({
      required_error: "",
    })
    .min(1, {
      message: "",
    }),
  variantOfId: z.string().optional().nullable(),
  images: z
    .array(z.instanceof(File), {
      required_error: "",
    })
    .min(1, {
      message: "At least one image is required.",
    }),
});

export type CreateProductSchemaType = z.infer<typeof CreateProductSchema>;

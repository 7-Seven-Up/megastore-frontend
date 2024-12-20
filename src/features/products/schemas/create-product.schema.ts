import { z } from "zod";
import { MAXIMUM_IMAGE_SIZE } from "@/features/products/constants.ts";

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
    .string()
    .max(80, {
      message: "Description must be less than 80 characters.",
    })
    .optional(),
  stock: z
    .number({
      coerce: true,
      message: "",
      required_error: "",
    })
    .int({
      message: "Stock must be an integer.",
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
    .int({
      message: "Price must be an integer.",
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
  variantOfId: z.string().optional(),
  images: z
    .array(z.instanceof(File), {
      required_error: "",
    })
    .min(1, {
      message: "At least one image is required.",
    })
    .refine((images) => images.every((image) => image.size < MAXIMUM_IMAGE_SIZE), {
      message: "Every image size must be less than 1MB",
    }),
});

export type CreateProductSchemaType = z.infer<typeof CreateProductSchema>;

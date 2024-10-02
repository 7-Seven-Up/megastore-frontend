import { z } from "zod";
import { optionalToNull } from "@/shared/utils/optionalToNull.ts";

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
    .string()
    .max(50, {
      message: "Description must be less than 50 characters",
    })
    .optional()
    .transform(optionalToNull),
  superCategoryId: z.string().optional().transform(optionalToNull),
});

export type UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>;

import { z } from "zod";

export const RecoverPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
    confirmPassword: z.string({
      required_error: "",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordRecoverPasswordSchemaType = z.infer<
  typeof RecoverPasswordSchema
>;

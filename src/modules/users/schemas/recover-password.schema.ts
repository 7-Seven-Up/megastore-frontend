import { z } from "zod";

export const RecoverPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      })
      .max(20, {
        message: "Password must be at most 20 characters long",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character",
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

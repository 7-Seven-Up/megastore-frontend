import { z } from "zod";

export const SignUpSchema = z.object({
  email: z
    .string({
      required_error: "",
    })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "E-mail format is not valid",
    }),
  fullName: z
    .string({
      required_error: "",
    })
    .min(3, {
      message: "Full name must be at least 3 characters long",
    })
    .max(20, {
      message: "Full name must be at most 20 characters long",
    }),
  password: z
    .string({
      required_error: "",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(20, {
      message: "Password must be at most 20 characters long",
    }),
  phoneNumber: z
    .string({
      required_error: "",
    })
    .regex(/^\d{10}$/, { message: "Phone number is not valid" }),
  username: z
    .string({
      required_error: "",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(20, {
      message: "Username must be at most 20 characters long",
    }),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

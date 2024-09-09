import { z } from "zod";

export const SignUpSchema = z.object({
  email: z
    .string({
      required_error: "",
    })
    .email({
      message: "El email no es valido",
    }),
  fullName: z
    .string({
      required_error: "",
    })
    .min(3)
    .max(20),
  password: z
    .string({
      required_error: "",
    })
    .min(3)
    .max(20),
  phoneNumber: z
    .string({
      required_error: "",
    })
    .regex(/^\d{10}$/, { message: "Numero de teléfono invalido" }),
  username: z
    .string({
      required_error: "",
    })
    .min(3)
    .max(20),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

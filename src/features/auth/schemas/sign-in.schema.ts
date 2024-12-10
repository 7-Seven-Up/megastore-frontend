import { z } from "zod";

export const SignInSchema = z.object({
  password: z
    .string({
      required_error: "",
    })
    .min(3)
    .max(20),
  username: z
    .string({
      required_error: "",
    })
    .min(3)
    .max(20),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

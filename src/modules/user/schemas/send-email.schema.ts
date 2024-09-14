import { z } from "zod";

export const SendEmailSchema = z.object({
  email: z
    .string({
      required_error: "Please provide a valid email",
    })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "E-mail format is not valid",
    }),
});

export type SendEmailSchemaType = z.infer<typeof SendEmailSchema>;

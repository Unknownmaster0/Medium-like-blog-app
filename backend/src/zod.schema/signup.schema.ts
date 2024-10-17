import { z } from "zod";

export const signupZodSchema = z.object({
  email: z.string().email().min(1, { message: "email field is required" }),
  password: z
    .string()
    .min(8, { message: "password shoudl be at-least of length 8" }),
  name: z.string().min(1, { message: "name field is required" }),
});

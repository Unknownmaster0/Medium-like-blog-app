import { z } from "zod";
export const signinZodSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8, { message: "must be at least 8 characters" }),
});

import { z } from "zod";

export const blogZodSchemaInput = z.object({
  title: z.string().min(1, { message: "title is required" }),
  content: z.string().min(1, { message: "content is required" }),
  published: z.boolean().optional(),
});

export const blogZodSchemaUpdate = z.object({
  id: z.string().min(1, { message: "id is required" }),
  title: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

export const signinZodSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8, { message: "must be at least 8 characters" }),
});

export const signupZodSchema = z.object({
  email: z.string().email().min(1, { message: "email field is required" }),
  password: z
    .string()
    .min(8, { message: "password shoudl be at-least of length 8" }),
  name: z.string().min(1, { message: "name field is required" }),
});

export type signup = z.infer<typeof signupZodSchema>;
export type signin = z.infer<typeof signinZodSchema>;
export type blogUpdate = z.infer<typeof blogZodSchemaUpdate>;
export type blogInput = z.infer<typeof blogZodSchemaInput>;

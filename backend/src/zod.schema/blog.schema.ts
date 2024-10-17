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

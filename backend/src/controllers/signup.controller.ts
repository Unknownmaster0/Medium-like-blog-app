import { Hono } from "hono";
import { validator } from "hono/validator";
import { getPrisma } from "../db";
import { sign } from "hono/jwt";
import { customResponse } from "../utils/customResponse";
import { signupZodSchema } from "../zod.schema/signup.schema";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post(
  "/",
  validator("json", (value, c) => {
    const parsed = signupZodSchema.safeParse(value);
    if (!parsed.success) {
      return c.json({ error: parsed.error }, 400);
    }
    return parsed.data;
  }),
  async (c) => {
    const { email, password, name } = c.req.valid("json");
    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
      const userExist = await prisma.user.findFirst({ where: { email } });

      if (userExist) {
        return customResponse(c, 403, "user already exists", userExist);
      }

      const user = await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });

      const jwtToken = await sign(
        { id: user.id, email: user.email, name: user.name },
        c.env.JWT_SECRET
      );

      return customResponse(c, 201, "user created successfully", {
        token: jwtToken,
      });
    } catch (e) {
      console.log(e);
      return customResponse(c, 500, "error creating user", {
        error: String(e),
      });
    }
  }
);

export default app;

import { Hono } from "hono";
import { validator } from "hono/validator";
import { getPrisma } from "../db";
import { customResponse } from "../utils/customResponse";
import { sign } from "hono/jwt";
import { signinZodSchema } from "@try-singh/medium-blog-common";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post(
  "/",
  validator("json", (value, c) => {
    const parsed = signinZodSchema.safeParse(value);
    if (!parsed.success)
      return customResponse(c, 403, "invalid credentials", {
        error: parsed.error,
      });
    return parsed.data;
  }),

  async (c) => {
    const { email, password } = c.req.valid("json");
    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
      const user = await prisma.user.findFirst({ where: { email } });
      // console.log(`user is: ${user}`);    if user not exist then this will return 'null
      if (user?.password !== password) {
        return customResponse(c, 403, "invalid credentials", "");
      }

      const token = await sign(
        { id: user.id, name: user.name, email: user.email },
        c.env.JWT_SECRET
      );

      return customResponse(c, 200, "sign-in successful", { token });
    } catch (err) {
      return customResponse(c, 500, "error while finding user in db", {
        error: String(err),
      });
    }
  }
);

export default app;

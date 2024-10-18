import { Hono } from "hono";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    id: string;
  };
}>();

import { createMiddleware } from "hono/factory";
import { customResponse } from "../utils/customResponse";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

export const authMiddleware = createMiddleware(async (c, next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];
  if (!token) return customResponse(c, 403, "Not have token", "");

  try {
    const payload: JWTPayload = await verify(token, c.env.JWT_SECRET);
    c.set("id", payload.id);
    await next();
  } catch (error) {
    return customResponse(c, 404, "not valid token", { error: String(error) });
  }
});

import { blogZodSchemaInput } from "@try-singh/medium-blog-common";
import { validator } from "hono/validator";
import { getPrisma } from "../db";

// this is the first otherwise, then /:id and /bulk will become same.`
app.get("/bulk", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const blogs = await prisma.post.findMany({
      include: {
        author: true,
      },
    }); // to find all the posts.
    return customResponse(c, 200, "Post send successfully", blogs);
  } catch (error) {
    return customResponse(c, 404, "Not found any blogs", {
      error: String(error),
    });
  }
});

app.get("/:id", async (c) => {
  const userId = c.get("id");
  const postId = c.req.param("id");
  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        author_id: userId,
      },
    });
    if (!post) {
      return customResponse(c, 403, "wrong post id", "");
    }
    return customResponse(c, 201, "post found successfully", post);
  } catch (error) {
    return customResponse(c, 404, "not found post", { error: String(error) });
  }
});

app.post(
  "/",
  validator("json", (value, c) => {
    const parsed = blogZodSchemaInput.safeParse(value);
    if (!parsed.success) {
      return customResponse(c, 404, "Not valid input", { error: parsed.error });
    }
    return parsed.data;
  }),
  authMiddleware,
  async (c) => {
    const userId = c.var.id; // you can also access this by the c.get(id)
    const prisma = getPrisma(c.env.DATABASE_URL);
    const { title, content } = c.req.valid("json");
    const currTime = new Date();
    const date = `${currTime.getDate()}-${
      currTime.getMonth() + 1
    }-${currTime.getFullYear()}`;
    try {
      const blogPost = await prisma.post.create({
        data: {
          title,
          content,
          author_id: userId,
          createdAt: date,
        },
      });
      return customResponse(c, 200, "post created successfully", blogPost);
    } catch (error) {
      return customResponse(c, 500, "Error while creating post in db", {
        error: String(error),
      });
    }
  }
);

// here you will get the post id in the body in json format.
import { blogZodSchemaUpdate, blogUpdate } from "@try-singh/medium-blog-common";
app.put(
  "/",
  authMiddleware,
  validator("json", (value, c) => {
    const parsed = blogZodSchemaUpdate.safeParse(value);
    if (!parsed.success) {
      return customResponse(c, 403, "Invalid input for update", "");
    }
    return parsed.data;
  }),
  async (c) => {
    const userId = c.get("id");
    const { id: postId, title, content } = c.req.valid("json");
    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
      type updateDataProps = Pick<blogUpdate, "title" | "content">;
      const updateData: updateDataProps = {};
      if (title) updateData.title = title;
      if (content) updateData.content = content;

      const updatedPost = await prisma.post.update({
        where: {
          id: postId,
          author_id: userId,
        },
        data: updateData,
      });

      return customResponse(c, 201, "Post updated successfully", updatedPost);
    } catch (error) {
      return customResponse(
        c,
        404,
        "Not found the post with id and userId",
        ""
      );
    }
  }
);

export default app;

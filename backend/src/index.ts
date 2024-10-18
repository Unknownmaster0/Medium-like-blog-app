import { Hono } from "hono";
const app = new Hono();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://localhost:5173"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

import signin from "./controllers/signin.controller";
import signup from "./controllers/signup.controller";
import blog from "./controllers/blog.controller";
import { cors } from "hono/cors";

app.route("/api/v1/signin", signin);
app.route("/api/v1/signup", signup);
app.route("/api/v1/blog", blog);

export default app;

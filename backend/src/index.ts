import { Hono } from "hono";
const app = new Hono();

import signin from "./controllers/signin.controller";
import signup from "./controllers/signup.controller";
import blog from "./controllers/blog.controller";

app.route("/api/v1/signin", signin);
app.route("/api/v1/signup", signup);
app.route("/api/v1/blog", blog);

export default app;

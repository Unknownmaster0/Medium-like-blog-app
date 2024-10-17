import { Context } from "hono";

export const customResponse = (
  c: Context,
  statusCode: number,
  message: string,
  data: any | null
) => {
  return c.json(
    {
      statusCode,
      message,
      data,
      success: statusCode <= 400,
    },
    { status: statusCode }
  );
};

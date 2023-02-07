import { rest } from "msw";
import { session, todolists, user } from "./utils";

const base = "http://127.0.0.1:1337";

const userBase = `${base}/api/users`;
const sessionBase = `${base}/api/sessions`;
const todolistBase = `${base}/api/todolist`;

export const unauthorizedUserHandler = rest.all(userBase, (req, res, ctx) => {
  return res(ctx.status(403));
});

export const handlers = [
];

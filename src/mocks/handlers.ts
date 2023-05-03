import { rest } from "msw";
import { session, todolists, user, notes } from "./utils";

const base = "http://127.0.0.1:1337";

const userBase = `${base}/api/users`;
const sessionBase = `${base}/api/sessions`;
const todolistBase = `${base}/api/todolist`;
const noteBase = `${base}/api/note`;

export const unauthorizedUserHandler = rest.all(userBase, (req, res, ctx) => {
  return res(ctx.status(403));
});

export const unauthorizedSessionHandler = rest.all(
  sessionBase,
  (req, res, ctx) => {
    return res(ctx.status(403));
  }
);

export const handlers = [
  rest.get(todolistBase, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todolists));
  }),

  rest.get(noteBase, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(notes));
  }),

  rest.get(userBase, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.post(userBase, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.post(sessionBase, async (req, res, ctx) => {
    const { email } = await req.json();
    if (email === "validUser@test.com") {
      return res(ctx.status(200), ctx.json(session));
    } else {
      return res(ctx.status(403));
    }
  }),
];

import { rest } from "msw";
import { renderHook, waitFor } from "@testing-library/react";
import { server } from "../mocks/server";
import { createWrapper } from "./utils/test-utils";
import { useTodolists } from "../hooks";
import { todolists } from "../mocks/utils";

describe("Test useTodolists hook", () => {
  it("should return an array of todolist", async () => {
    const { result } = renderHook(() => useTodolists(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    if (result.current.data) {
      expect(result.current.data).toEqual(todolists);
    }
  });

  it("should catch the error on bad request", async () => {
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { result } = renderHook(() => useTodolists(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});

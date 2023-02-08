import { renderWithClient } from "../tests/utils/test-utils";
import { screen } from "@testing-library/dom";
import { server } from "../mocks/server";
import { unauthorizedUserHandler } from "../mocks/handlers";
import RequireAuth from "./requireAuth";

describe("Given the user is not logged in", () => {
  it("should redirect to the login page", async () => {
    server.use(unauthorizedUserHandler);
    renderWithClient(
      <RequireAuth>
        <h1>Authenticated</h1>
      </RequireAuth>
    );
    expect(window.location.pathname).toBe("/");
  });
});

describe("Given the user is logged in", () => {
  it("should render it's children", async () => {
    renderWithClient(
      <RequireAuth>
        <h1>Authenticated</h1>
      </RequireAuth>
    );
    expect(await screen.findByText(/Authenticated/i)).toBeInTheDocument();
  });
});

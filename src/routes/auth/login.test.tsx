import { renderWithClient } from "../../tests/utils/test-utils";
import { screen } from "@testing-library/dom";
import { server } from "../../mocks/server";
import { unauthorizedSessionHandler } from "../../mocks/handlers";
import Login from "./login";
import userEvent from "@testing-library/user-event";

describe("Given the user enter an invalid email or password", () => {
  it("should show a error message", async () => {
    server.use(unauthorizedSessionHandler);
    renderWithClient(<Login />);
    const user = userEvent.setup();

    expect(
      await screen.findByRole("heading", { name: /login/i })
    ).toBeInTheDocument();
    expect(await screen.findByLabelText(/email/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/password/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/email/i), "invalidUser@test.com");
    await user.type(screen.getByLabelText(/password/i), "invalidPassword");
    await user.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});

describe("Given the user click the cancel button", () => {
  it("should show a error message", async () => {
    server.use(unauthorizedSessionHandler);
    renderWithClient(<Login />);
    const user = userEvent.setup();

    await user.click(await screen.findByRole("button", { name: /cancel/i }));
    expect(window.location.pathname).toBe("/");
  });
});

describe("given the user enter a valid email and password", () => {
  it("Should navigate to the todolists page after a successful login", async () => {
    renderWithClient(<Login />);
    const user = userEvent.setup();

    expect(
      await screen.findByRole("heading", { name: /login/i })
    ).toBeInTheDocument();
    expect(await screen.findByLabelText(/email/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/password/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/email/i), "validUser@test.com");
    await user.type(screen.getByLabelText(/password/i), "validUserPassword123");
    await user.click(screen.getByRole("button", { name: /login/i }));
    expect(window.location.pathname).toBe("/home/all");
  });
});

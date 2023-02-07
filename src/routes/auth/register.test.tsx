import { renderWithClient } from "../../tests/utils/test-utils";
import { screen } from "@testing-library/dom";
import { server } from "../../mocks/server";
import { unauthorizedUserHandler } from "../../mocks/handlers";
import userEvent from "@testing-library/user-event";
import Register from "./register";

describe("Given the user enter an invalid email or password", () => {
  it("should show a error message", async () => {
    server.use(unauthorizedUserHandler);
    renderWithClient(<Register />);
    const user = userEvent.setup();

    expect(
      await screen.findByRole("heading", { name: /Register/i })
    ).toBeInTheDocument();
    expect(await screen.findByLabelText(/username/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/email/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/^password/i)).toBeInTheDocument();
    expect(
      await screen.findByLabelText(/confirm password/i)
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText(/username/i), "invalidUsername");
    await user.type(screen.getByLabelText(/email/i), "invalidUser@test.com");
    await user.type(screen.getByLabelText(/^password/i), "invalidPassword");
    await user.type(
      screen.getByLabelText(/confirm password/i),
      "invalidPassword"
    );

    await user.click(screen.getByRole("button", { name: /register/i }));
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});

describe("Given the user click the cancel button", () => {
  it("should show a error message", async () => {
    server.use(unauthorizedUserHandler);
    renderWithClient(<Register />);
    const user = userEvent.setup();

    await user.click(await screen.findByRole("button", { name: /cancel/i }));
    expect(window.location.pathname).toBe("/");
  });
});

describe("given the user enter a valid email and password", () => {
  it("Should navigate to the login page after a successful register", async () => {
    renderWithClient(<Register />);
    const user = userEvent.setup();

    expect(
      await screen.findByRole("heading", { name: /register/i })
    ).toBeInTheDocument();
    expect(await screen.findByLabelText(/username/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/email/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/^password/i)).toBeInTheDocument();
    expect(
      await screen.findByLabelText(/confirm password/i)
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText(/username/i), "userOne");
    await user.type(screen.getByLabelText(/email/i), "userOne@test.com");
    await user.type(screen.getByLabelText(/^password/i), "userOnePassword123");
    await user.type(
      screen.getByLabelText(/confirm password/i),
      "userOnePassword123"
    );
    await user.click(screen.getByRole("button", { name: /register/i }));
    expect(window.location.pathname).toBe("/login");
  });
});

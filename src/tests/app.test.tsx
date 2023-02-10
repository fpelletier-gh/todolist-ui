import { renderWithRouter } from "./utils/test-utils";
import { screen } from "@testing-library/dom";
import { within } from "@testing-library/react";
import { server } from "../mocks/server";
import { unauthorizedUserHandler } from "../mocks/handlers";

describe("Given the user is not logged in", () => {
  it("should show a login and register link", async () => {
    server.use(unauthorizedUserHandler);
    const { user } = renderWithRouter();

    expect(
      await screen.findByRole("link", { name: /login/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: /register/i })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /login/i }));
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  describe("given the user is logged in", () => {
    it("Should navigate to the todolists page when clicking on the link on the landingPage", async () => {
      const { user } = renderWithRouter();
      expect(
        await screen.findByRole("link", { name: /Todolists/i })
      ).toBeInTheDocument();

      await user.click(screen.getByRole("link", { name: "Todolists" }));
      expect(screen.getByText(/search/i)).toBeInTheDocument();

      expect(
        within(screen.getByRole("navigation")).getByText(/new todolist/i)
      ).toBeInTheDocument();
    });
  });
});

import { screen } from "@testing-library/dom";
import { renderWithClient } from "../tests/utils/test-utils";
import Profile from "./profile";
import { user } from "../mocks/utils";

describe("Given the user is logged in", () => {
  it("should show the username and email", async () => {
    renderWithClient(<Profile />);
    const username = user.username[0].toUpperCase() + user.username.slice(1);
    const email = user.email;

    expect(await screen.findByText(username)).toBeInTheDocument();
    expect(await screen.findByText(email)).toBeInTheDocument();
  });
});

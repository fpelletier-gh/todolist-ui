import { screen } from "@testing-library/dom";
import { renderWithClient } from "../tests/utils/test-utils";
import NewTodolistCard from "./newTodolistCard";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/react";

describe("Test NewTodolistCard", () => {
  it("should show a title and a description", async () => {
    renderWithClient(<NewTodolistCard />);

    expect(await screen.findByText(/Add a new todolist/i)).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", {
        name: /add a new todolist/i,
      })
    );
    const dialog = screen.getByRole("dialog", {
      name: /new todolist/i,
    });

    expect(within(dialog).getByText(/new todolist/i)).toBeInTheDocument();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
  });
});

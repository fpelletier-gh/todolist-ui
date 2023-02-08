import { screen } from "@testing-library/dom";
import { renderWithClient } from "../tests/utils/test-utils";
import NewTodolistCard from "./newTodolistCard";

describe("Test NewTodolistCard", () => {
  it("should show a title and a description", async () => {
    renderWithClient(<NewTodolistCard />);

    expect(
      await screen.findByRole("heading", { name: /New/i })
    ).toBeInTheDocument();
    expect(await screen.findByText(/Add a new todolist/i)).toBeInTheDocument();
  });
});

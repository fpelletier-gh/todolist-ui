import { screen } from "@testing-library/dom";
import { renderWithClient } from "../tests/utils/test-utils";
import Todolists from "./todolists";
import { todolists } from "../mocks/utils";

describe("Test Todolists", () => {
  it("should show a title, description and checkbox with todos from more than one todolist", async () => {
    renderWithClient(<Todolists />);

    expect(
      await screen.findByRole("heading", { name: todolists[0].title })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: todolists[1].title })
    ).toBeInTheDocument();
    expect(screen.getByText(todolists[0].description)).toBeInTheDocument();
    expect(
      screen.getByLabelText(todolists[0].todos[0].title)
    ).toBeInTheDocument();
    expect(screen.getByText(todolists[1].description)).toBeInTheDocument();
    expect(
      screen.getByLabelText(todolists[1].todos[0].title)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: todolists[0].todos[0].title })
    ).toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: todolists[0].todos[1].title })
    ).toHaveProperty("checked", false);
    expect(
      screen.getByRole("checkbox", { name: todolists[1].todos[0].title })
    ).toBeChecked();
  });
});

import { screen } from "@testing-library/dom";
import { renderWithClient } from "../tests/utils/test-utils";
import TodolistCard from "./todolistCard";
import { todolistWithTodos } from "../mocks/utils";

describe("Test todolistCard", () => {
  it("should show a title, description and checkbox with todos", async () => {
    const todolist = todolistWithTodos;
    renderWithClient(<TodolistCard todolist={todolist} />);

    expect(
      await screen.findByRole("heading", { name: todolist.title })
    ).toBeInTheDocument();
    expect(screen.getByText(todolist.description)).toBeInTheDocument();
    expect(screen.getByLabelText(todolist.todos[0].title)).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: todolist.todos[0].title })
    ).toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: todolist.todos[1].title })
    ).toHaveProperty("checked", false);
  });
});

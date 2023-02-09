import { Checkbox, Flex } from "@mantine/core";
import { useUpdateTodo } from "../hooks";
import { TodoSchema } from "../types";

export default function Todo({
  todolistId,
  todo,
}: {
  todolistId: string;
  todo: TodoSchema;
}) {
  const { updateTodo } = useUpdateTodo();

  // TODO: add optimistic update for checkbox
  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateTodo({
      todolistId: todolistId,
      todoId: todo.todoId,
      payload: { complete: e.currentTarget.checked },
    });
  }

  return (
    <Flex
      className="todo"
      mt="xs"
      justify="space-between"
      align="center"
    >
      <Checkbox
        display="flex"
        checked={todo.complete}
        label={todo.title}
        sx={{ lineHeight: 1 }}
        radius="sm"
        onChange={handleCheckboxChange}
      />
    </Flex>
  );
}

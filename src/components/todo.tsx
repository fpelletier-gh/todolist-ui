import { Checkbox, Flex } from "@mantine/core";
import { useState } from "react";
import { useUpdateTodo } from "../hooks";
import { TodoSchema } from "../types";
import TodoMenu from "./todoMenu";

export default function Todo({
  todolistId,
  todo,
}: {
  todolistId: string;
  todo: TodoSchema;
}) {
  const { updateTodo } = useUpdateTodo();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateTodo({
      todolistId: todolistId,
      todoId: todo.todoId,
      payload: { complete: e.currentTarget.checked },
    });
  }

  return (
    <Flex
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
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
      <TodoMenu
        isVisible={isVisible}
        todolistId={todolistId}
        todoId={todo.todoId}
      />
    </Flex>
  );
}

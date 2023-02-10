import {
  Text,
  Flex,
  Title,
  Loader,
  Button,
  Input,
  Card,
  Group,
  Box,
  Container,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createTodo } from "../api";
import Todo from "../components/todo";
import { TodoSchema } from "../types";
import { useTodolist } from "../hooks";
import { IconX } from "@tabler/icons";
import TodolistMenu from "../components/todolistMenu";

export default function Todolist() {
  const params = useParams();
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { title: "" },
  });

  if (!params.todolistId) {
    return <Flex>Error: invalid todolist id</Flex>;
  }

  const todolist = useTodolist(params.todolistId);

  // TODO: refactor createTodoMutation to hook
  const createTodoMutation = useMutation(createTodo, {
    onMutate: () => {
      return <Loader />;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todolist"]);
      setNewTodo(false);
    },
    onError: () => {
      showNotification({
        id: "create-todolist",
        title: "Error",
        message: "Could not create todo",
        color: "red",
        icon: <IconX />,
      });
    },
  });

  function handleNewTodo() {
    setNewTodo(true);
  }

  function handleNewTodoSave(formData: { title: string }) {
    if (typeof params.todolistId === "string") {
      createTodoMutation.mutate({
        todolistId: params.todolistId,
        payload: formData,
      });
    }
    form.setFieldValue("title", "");
    setNewTodo(false);
  }

  function handleCancelFormSubmit(e: any) {
    if (!e.nativeEvent.relatedTarget) {
      form.setFieldValue("title", "");
      setNewTodo(false);
    }
  }
  if (todolist.data) {
    return (
      <>
        <Card shadow="sm" maw="400px" mih="160px" p="lg" radius="md" withBorder>
          <Card.Section withBorder inheritPadding py="xs">
            <Group position="apart" noWrap>
              <Title order={2}>{todolist.data?.title}</Title>
              <TodolistMenu
                todolistId={params.todolistId}
                navigatePath="/todolist"
              />
            </Group>
            <Text size="sm" color="dimmed">
              {todolist.data?.description}
            </Text>
          </Card.Section>

          <Flex pt="md" direction="column">
            {todolist.data?.todos.map((todo: TodoSchema) => (
              <Todo
                key={todo.todoId}
                todolistId={params.todolistId || ""}
                todo={todo}
              />
            ))}
            {!todolist.data?.todos[0] && (
              <Text align="center" fw="500">
                No todo
              </Text>
            )}
            {newTodo && (
              <Box pt="xs">
                <form
                  onSubmit={form.onSubmit((formData) =>
                    handleNewTodoSave(formData)
                  )}
                  onBlur={handleCancelFormSubmit}
                >
                  <Input
                    placeholder="New Todo"
                    autoFocus
                    {...form.getInputProps("title")}
                  />
                  <Button
                    my="xs"
                    mr="xs"
                    radius="md"
                    variant="filled"
                    compact
                    className="submitBtn"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    my="xs"
                    radius="md"
                    variant="subtle"
                    className="cancelBtn"
                    compact
                    onClick={handleCancelFormSubmit}
                    type="button"
                  >
                    Cancel
                  </Button>
                </form>
              </Box>
            )}
            {!newTodo && (
              <Flex pt="md">
                <Button
                  compact
                  radius="md"
                  className="newTodo"
                  onClick={handleNewTodo}
                >
                  Add a todo
                </Button>
              </Flex>
            )}
          </Flex>
        </Card>
      </>
    );
  }

  if (todolist.isFetching) {
    return <Loader />;
  }

  if (todolist.error instanceof Error) {
    return (
      <Container>
        <Title order={2}>Error</Title>
        <Text>{todolist.error.message}</Text>
      </Container>
    );
  }

  return <Text></Text>;
}

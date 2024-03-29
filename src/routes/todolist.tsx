import {
  Text,
  Flex,
  Title,
  Button,
  Input,
  Card,
  Group,
  Box,
  Container,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { createTodo } from "../api";
import Todo from "../components/todo";
import { TodoSchema } from "../types";
import { useTodolist } from "../hooks";
import { IconX } from "@tabler/icons-react";
import TodolistMenu from "../components/todolistMenu";
import StyledLoader from "../components/styledLoader";

export default function Todolist() {
  const params = useParams();
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState<boolean>(false);

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
      return <StyledLoader />;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todolists"]);
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
          <Card.Section
            withBorder
            inheritPadding
            py="xs"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[7]
                  : theme.colors.gray[2],
            })}
          >
            <Group position="apart" noWrap>
              <Title order={2}>{todolist.data?.title}</Title>
              <TodolistMenu todolistId={params.todolistId} />
            </Group>
            <Text size="sm" sx={{ whiteSpace: "pre-line" }} color="dimmed">
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
            {!todolist.data?.todos[0] && <Text fw="500">No todo</Text>}
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
                    px="lg"
                    my="xs"
                    mr="xs"
                    variant="gradient"
                    className="submitBtn"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    my="xs"
                    variant="subtle"
                    className="cancelBtn"
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
                  variant="gradient"
                  className="newTodo"
                  onClick={handleNewTodo}
                >
                  Add a todo
                </Button>
              </Flex>
            )}
          </Flex>
        </Card>
        <Box mt="lg">
          <Anchor component={Link} underline={false} to="/home/todolists">
            Back to todolists
          </Anchor>
        </Box>
      </>
    );
  }

  if (todolist.isFetching) {
    return <StyledLoader />;
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

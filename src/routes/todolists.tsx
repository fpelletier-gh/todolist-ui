import { SimpleGrid, Flex, Title } from "@mantine/core";
import NewTodolistCard from "../components/newTodolistCard";
import TodolistCard from "../components/todolistCard";
import { useTodolists } from "../hooks";
import { TodolistSchema } from "../types";

export default function Todolists() {
  const todolistsQuery = useTodolists();

  if (todolistsQuery.error instanceof Error) {
    return <Flex>Error: {todolistsQuery.error.message}</Flex>;
  }

  return (
    <>
      <Flex direction="column" p="md" w="100%">
        <Title order={2} p="md">
          Todolists
        </Title>
        <SimpleGrid
          p="md"
          spacing="xl"
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
          cols={4}
        >
          <NewTodolistCard />
          {todolistsQuery.data &&
            todolistsQuery.data.map((todolist: TodolistSchema) => (
              <TodolistCard key={todolist.todolistId} todolist={todolist} />
            ))}
        </SimpleGrid>
      </Flex>
    </>
  );
}

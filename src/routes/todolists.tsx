import { SimpleGrid, Flex, Title, Anchor, Box, Container } from "@mantine/core";
import { Link } from "react-router-dom";
import NewTodolistCard from "../components/newTodolistCard";
import TodolistCard from "../components/todolistCard";
import { useTodolists } from "../hooks";
import { TodolistSchema } from "../types";

export default function Todolists({
  maxCardNumber,
  titleLink = false,
}: {
  maxCardNumber?: number;
  titleLink?: boolean;
}) {
  const todolistsQuery = useTodolists();

  if (todolistsQuery.error instanceof Error) {
    return <Flex>Error: {todolistsQuery.error.message}</Flex>;
  }

  return (
    <>
      <Container px="0">
        {titleLink && (
          <Title order={2} p="md">
            <Anchor
              component={Link}
              sx={(theme) => ({ "&:hover": { color: theme.colors.blue[4] } })}
              variant="text"
              to="/home/todolists"
            >
              Todolists
            </Anchor>
          </Title>
        )}
        {!titleLink && (
          <Title order={2} p="md">
            Todolists
          </Title>
        )}
        <SimpleGrid
          p="md"
          spacing="xl"
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
          ]}
          cols={4}
        >
          <NewTodolistCard />
          {todolistsQuery.data &&
            todolistsQuery.data
              .slice(0, maxCardNumber)
              .map((todolist: TodolistSchema) => (
                <TodolistCard key={todolist.todolistId} todolist={todolist} />
              ))}
        </SimpleGrid>
        {!titleLink && (
          <Box p="md">
            <Anchor component={Link} underline={false} to="/home/all">
              Back to home
            </Anchor>
          </Box>
        )}
      </Container>
    </>
  );
}

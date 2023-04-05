import { SimpleGrid, Title, Anchor, Box, Container } from "@mantine/core";
import { Link } from "react-router-dom";
import NewTodolistCard from "../components/newTodolistCard";
import NoteCard from "../components/noteCard";
import TodolistCard from "../components/todolistCard";
import { useFavorites } from "../hooks";

export default function Favorites({
  maxCardNumber,
  titleLink = false,
}: {
  maxCardNumber?: number;
  titleLink?: boolean;
}) {
  const { favorites } = useFavorites();

  return (
    <>
      <Container px="0">
        {titleLink && (
          <Title order={2} p="md">
            <Anchor
              component={Link}
              sx={(theme) => ({ "&:hover": { color: theme.colors.blue[4] } })}
              variant="text"
              to="/home/favorites"
            >
              Favorites
            </Anchor>
          </Title>
        )}
        {!titleLink && (
          <Title order={2} p="md">
            Favorites
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
          {favorites &&
            favorites.slice(0, maxCardNumber).map((item) => {
              if ("noteId" in item) {
                return <NoteCard key={item.noteId} note={item} />;
              }
              return <TodolistCard key={item.todolistId} todolist={item} />;
            })}
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

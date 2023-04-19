import { SimpleGrid, Flex, Title, Anchor, Box } from "@mantine/core";
import { Link } from "react-router-dom";
import NewNoteCard from "../components/newNoteCard";
import NoteCard from "../components/noteCard";
import { useNotes } from "../hooks";
import { NoteSchema } from "../types";

export default function Notes({
  maxCardNumber = undefined,
  titleLink = false,
}: {
  maxCardNumber?: number;
  titleLink?: boolean;
}) {
  const notesQuery = useNotes();
  const minCardNumber = maxCardNumber ? 0 : undefined;

  if (notesQuery.error instanceof Error) {
    return <Flex>Error: {notesQuery.error.message}</Flex>;
  }

  return (
    <>
      <Flex direction="column" w="100%">
        {titleLink && (
          <Title order={2} p="md">
            <Anchor
              component={Link}
              sx={(theme) => ({ "&:hover": { color: theme.colors.blue[4] } })}
              variant="text"
              to="/home/notes"
            >
              Notes
            </Anchor>
          </Title>
        )}
        {!titleLink && (
          <Title order={2} p="md">
            Notes
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
          <NewNoteCard />
          {notesQuery.data &&
            notesQuery.data
              .slice(minCardNumber, maxCardNumber)
              .map((note: NoteSchema) => (
                <NoteCard key={note.noteId} note={note} />
              ))}
        </SimpleGrid>
        {!titleLink && (
          <Box p="md">
            <Anchor component={Link} underline={false} to="/home/all">
              Back to home
            </Anchor>
          </Box>
        )}
      </Flex>
    </>
  );
}

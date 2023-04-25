import {
  Text,
  Flex,
  Title,
  Card,
  Group,
  Box,
  Container,
  Anchor,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useNote } from "../hooks";
import NoteMenu from "../components/noteMenu";
import StyledLoader from "../components/styledLoader";

export default function Note() {
  const params = useParams();

  if (!params.noteId) {
    return <Flex>Error: invalid note id</Flex>;
  }

  const note = useNote(params.noteId);

  if (note.data) {
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
              <Title order={2}>{note.data?.title}</Title>
              <NoteMenu noteId={params.noteId} />
            </Group>
          </Card.Section>
          <Text
            size="sm"
            pt="md"
            sx={{ whiteSpace: "pre-line" }}
            color="dimmed"
          >
            {note.data?.content}
          </Text>
        </Card>
        <Box mt="lg">
          <Anchor component={Link} underline={false} to="/home/notes">
            Back to notes
          </Anchor>
        </Box>
      </>
    );
  }

  if (note.isFetching) {
    return <StyledLoader />;
  }

  if (note.error instanceof Error) {
    return (
      <Container>
        <Title order={2}>Error</Title>
        <Text>{note.error.message}</Text>
      </Container>
    );
  }

  return <Text></Text>;
}

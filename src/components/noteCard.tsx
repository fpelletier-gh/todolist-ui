import {
  Text,
  Card,
  Anchor,
  Group,
  Title,
  Flex,
  Checkbox,
} from "@mantine/core";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NoteSchema, TodoSchema } from "../types";
import NoteMenu from "./noteMenu";

export default function NoteCard({ note }: { note: NoteSchema }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const styles = {
    checkbox: { input: { cursor: "pointer" }, label: { cursor: "pointer" } },
  };

  function handleCheckboxClick(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();
    if (ref.current) {
      const current = ref.current as HTMLDivElement;
      navigate(`/note/${current.id}`);
    }
  }

  return (
    <Anchor
      component={Link}
      key={note.noteId}
      td="none"
      underline={false}
      to={`/note/${note.noteId}`}
    >
      <Card
        shadow="sm"
        maw="400px"
        mih="160px"
        mah="160px"
        p="sm"
        radius="md"
        withBorder
        sx={(theme) => ({
          "&:hover": {
            borderColor:
              theme.colorScheme === "dark"
                ? theme.colors.blue[6]
                : theme.colors.blue[3],
          },
        })}
      >
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
          <Group noWrap={true} position="apart">
            <Title truncate={true} order={3} size="lg">
              {note.title}
            </Title>
            <NoteMenu noteId={note.noteId} navigatePath="/note" />
          </Group>
        </Card.Section>
        <Text
          truncate={true}
          sx={{ whiteSpace: "pre-line", overflowY: "hidden" }}
          pt="sm"
          mah="90px"
          size="sm"
          color="dimmed"
        >
          {note.content}
        </Text>
      </Card>
    </Anchor>
  );
}

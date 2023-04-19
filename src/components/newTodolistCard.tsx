import { Text, Card, Anchor, Title, ThemeIcon } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useNewTodolist } from "../hooks";
import { openNewTodolistModal } from "./newTodolistForm";

export default function NewTodolistCard() {
  const navigate = useNavigate();
  const { newTodolist } = useNewTodolist();

  function handleNewTodolistClick() {
    openNewTodolistModal(navigate, newTodolist);
  }

  return (
    <Anchor
      component="button"
      onClick={handleNewTodolistClick}
      td="none"
      underline={false}
    >
      <Card
        shadow="sm"
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing.md,
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[2],
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[3],
            borderColor:
              theme.colorScheme === "dark"
                ? theme.colors.blue[6]
                : theme.colors.blue[3],
          },
        })}
        maw="400px"
        mih="160px"
        mah="160px"
        p="sm"
        radius="md"
        withBorder
      >
        <ThemeIcon
          sx={(theme) => ({
            backgroundColor: "transparent",

            color:
              theme.colorScheme === "dark"
                ? theme.colors.white
                : theme.colors.dark[8],
          })}
        >
          <IconPencilPlus />
        </ThemeIcon>
        <Text size="sm" color="dimmed">
          Add a new todolist
        </Text>
      </Card>
    </Anchor>
  );
}

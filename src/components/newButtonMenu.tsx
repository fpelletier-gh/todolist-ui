import { createStyles, Menu, UnstyledButton, ThemeIcon } from "@mantine/core";
import {
  IconListDetails,
  IconNotes,
  IconPencilPlus,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useNewTodolist, useNewNote } from "../hooks";
import { openNewTodolistModal } from "./newTodolistForm";
import { openNewNoteModal } from "./newNoteForm";

const useStyles = createStyles((theme) => ({
  button: {
    borderRadius: "50%",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[1],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[3],
    },
  },
}));

export default function NewTodolistButton() {
  const navigate = useNavigate();
  const { newTodolist } = useNewTodolist();
  const { newNote } = useNewNote();
  const { classes } = useStyles();

  return (
    <Menu shadow="md" position="top-end" arrowOffset={20} withArrow>
      <Menu.Target>
        <UnstyledButton className={classes.button}>
          <ThemeIcon variant="outline" radius="xl" size="xl">
            <IconPencilPlus />
          </ThemeIcon>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[2],
        })}
      >
        <Menu.Label>New</Menu.Label>
        <Menu.Item
          onClick={() => openNewTodolistModal(navigate, newTodolist)}
          icon={<IconListDetails size={14} />}
        >
          Todolist
        </Menu.Item>
        <Menu.Item
          onClick={() => openNewNoteModal(navigate, newNote)}
          icon={<IconNotes size={14} />}
        >
          Note
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

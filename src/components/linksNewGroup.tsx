import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
} from "@tabler/icons-react";
import { NavigateFunction } from "react-router-dom";
import { openNewTodolistModal } from "./newTodolistForm";
import { UseMutateFunction } from "@tanstack/react-query";
import {
  NotePayloadSchema,
  NoteSchema,
  TodolistPayloadSchema,
  TodolistSchema,
} from "../types";
import { openNewNoteModal } from "./newNoteForm";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

interface LinksGroupProps {
  navigate: NavigateFunction;
  newTodolist: UseMutateFunction<
    TodolistSchema,
    unknown,
    TodolistPayloadSchema,
    unknown
  >;
  newNote: UseMutateFunction<NoteSchema, unknown, NotePayloadSchema, unknown>;
  closeNavbar: () => void;
}

export default function LinksNewGroup({
  navigate,
  newTodolist,
  newNote,
  closeNavbar,
}: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;

  function handleNewTodolistClick() {
    closeNavbar();
    openNewTodolistModal(navigate, newTodolist);
  }

  function handleNewNoteClick() {
    closeNavbar();
    openNewNoteModal(navigate, newNote);
  }

  return (
    <>
      <UnstyledButton
        onClick={() => {
          setOpened((o) => !o);
        }}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="gradient" size={30}>
              <IconPlus size={18} />
            </ThemeIcon>
            <Box ml="md">New</Box>
          </Box>
          <ChevronIcon
            className={classes.chevron}
            size={14}
            stroke={1.5}
            style={{
              transform: opened
                ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                : "none",
            }}
          />
        </Group>
      </UnstyledButton>
      <Collapse in={opened}>
        <UnstyledButton
          className={classes.link}
          onClick={handleNewTodolistClick}
        >
          Todolist
        </UnstyledButton>
        <UnstyledButton className={classes.link} onClick={handleNewNoteClick}>
          Note
        </UnstyledButton>
      </Collapse>
    </>
  );
}

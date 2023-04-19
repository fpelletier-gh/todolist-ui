import { Box, createStyles } from "@mantine/core";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useUpdateNote, useUpdateTodolist } from "../hooks";
import { NoteSchema, TodolistSchema } from "../types";

const useStyles = createStyles((theme) => ({
  button: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    margin: 0,
    verticalAlign: "center",
  },
  icon: {
    width: "20px",
    height: "20px",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[4],

    "&:hover": {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[5],
    },
  },
}));

export function FavoriteTodolist({ todolist }: { todolist: TodolistSchema }) {
  const { mutate } = useUpdateTodolist();
  const { classes } = useStyles();

  function handleFavoriteClick(e: any) {
    e.preventDefault();
    mutate({
      todolistId: todolist.todolistId,
      payload: {
        title: todolist.title,
        description: todolist.description,
        favorite: !todolist.favorite,
      },
    });
  }

  return (
    <Box
      component="button"
      className={classes.button}
      onClick={handleFavoriteClick}
    >
      {todolist.favorite ? (
        <IconStarFilled className={classes.icon} />
      ) : (
        <IconStar className={classes.icon} />
      )}
    </Box>
  );
}

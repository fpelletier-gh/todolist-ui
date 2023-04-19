import { Text } from "@mantine/core";
import {
  IconHome,
  IconListDetails,
  IconNotes,
  IconStar,
} from "@tabler/icons-react";
import {
  useNewTodolist,
  useNewNote,
  useNotes,
  useTodolists,
  useFavorites,
} from "../hooks";
import { NoteSchema, TodolistSchema } from "../types";
import LinksGroup from "./linksGroup";
import LinkNav from "./linkNav";
import { useNavigate } from "react-router-dom";
import LinksNewGroup from "./linksNewGroup";

export default function Sidebar({ closeNavbar }: { closeNavbar: () => void }) {
  const navigate = useNavigate();
  const { newTodolist } = useNewTodolist();
  const { newNote } = useNewNote();
  const todolists = useTodolists();
  const notes = useNotes();
  const { favorites } = useFavorites();

  if (todolists.error instanceof Error) {
    return <Text>Error: {todolists.error.message}</Text>;
  }

  const favoriteLinks =
    favorites &&
    favorites.map((item) => {
      if ("noteId" in item) {
        return {
          label: item.title,
          link: `/note/${item.noteId}`,
          id: item.noteId,
        };
      }
      return {
        label: item.title,
        link: `/todolist/${item.todolistId}`,
        id: item.todolistId,
      };
    });

  const todolistsLinks =
    todolists.data &&
    todolists.data.map((todolist: TodolistSchema) => {
      return {
        label: todolist.title,
        link: `/todolist/${todolist.todolistId}`,
        id: todolist.todolistId,
      };
    });

  const notesLinks =
    notes.data &&
    notes.data.map((note: NoteSchema) => {
      return {
        label: note.title,
        link: `/note/${note.noteId}`,
        id: note.noteId,
      };
    });

  return (
    <>
      <LinkNav
        label="Home"
        icon={IconHome}
        link="/home/all"
        closeNavbar={closeNavbar}
      />
      <LinksNewGroup
        navigate={navigate}
        newTodolist={newTodolist}
        newNote={newNote}
        closeNavbar={closeNavbar}
      />
      <LinksGroup
        label="Favorites"
        icon={IconStar}
        links={favoriteLinks}
        closeNavbar={closeNavbar}
      />
      <LinksGroup
        label="Todolists"
        icon={IconListDetails}
        links={todolistsLinks}
        closeNavbar={closeNavbar}
      />
      <LinksGroup
        label="Notes"
        icon={IconNotes}
        links={notesLinks}
        closeNavbar={closeNavbar}
      />
    </>
  );
}

import { SpotlightProvider } from "@mantine/spotlight";
import {
  IconArticle,
  IconCheckbox,
  IconChecklist,
  IconHome,
  IconSearch,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useNewNote, useNewTodolist, useNotes, useTodolists } from "../hooks";
import { NoteSchema, TodolistSchema } from "../types";
import type { SpotlightAction } from "@mantine/spotlight";
import { openNewTodolistModal } from "../components/newTodolistForm";
import { openNewNoteModal } from "../components/newNoteForm";

export default function SpotlightWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const todolists = useTodolists();
  const notes = useNotes();
  const navigate = useNavigate();
  const { newTodolist } = useNewTodolist();
  const { newNote } = useNewNote();

  const sortedNotesAndTodolists = [
    ...(todolists?.data || []),
    ...(notes?.data || []),
  ].sort((a, b) => {
    return b.updatedAt.localeCompare(a.updatedAt);
  });

  const todolistsAndNotesActions: SpotlightAction[] =
    sortedNotesAndTodolists.map((item: TodolistSchema | NoteSchema) => {
      if ("todolistId" in item) {
        const keywords = item.todos.map((todo) => todo.title.toLowerCase());
        return {
          title: item.title,
          description: item.description,
          onTrigger: () => navigate(`/todolist/${item.todolistId}`),
          icon: <IconCheckbox size={18} />,
          group: "search",
          keywords: keywords,
        };
      }
      return {
        title: item.title,
        description: item.content,
        onTrigger: () => navigate(`/todolist/${item.noteId}`),
        icon: <IconCheckbox size={18} />,
        group: "search",
      };
    }) || [];

  const actions: SpotlightAction[] = [
    {
      title: "Home",
      description: "Get to the todolists page",
      onTrigger: () => navigate(`/home/all`),
      icon: <IconHome size={18} />,
      group: "main",
    },
    {
      title: "New todolist",
      description: "Create a new todolist",
      onTrigger: () => openNewTodolistModal(navigate, newTodolist),
      icon: <IconChecklist size={18} />,
      group: "main",
    },
    {
      title: "New note",
      description: "Create a new note",
      onTrigger: () => openNewNoteModal(navigate, newNote),
      icon: <IconArticle size={18} />,
      group: "main",
    },
    ...todolistsAndNotesActions,
  ];

  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search..."
      shortcut={["mod + k", "/"]}
      nothingFoundMessage="Nothing found..."
    >
      {children}
    </SpotlightProvider>
  );
}

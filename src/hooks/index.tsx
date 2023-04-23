import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNote,
  createTodolist,
  deleteNote,
  deleteTodo,
  deleteTodolist,
  getNote,
  getNotes,
  getTodolist,
  getTodolists,
  getUser,
  updateNote,
  updateTodo,
  updateTodolist,
} from "../api";
import {
  NotePayloadSchema,
  TodolistPayloadSchema,
  TodolistSchema,
  TodoPayload,
} from "../types";

export function useTodolists() {
  return useQuery({
    queryKey: ["todolists"],
    queryFn: getTodolists,
    keepPreviousData: true,
  });
}

export function useTodolist(todolistId: string) {
  return useQuery({
    queryKey: ["todolist", todolistId],
    queryFn: () => getTodolist(todolistId),
    keepPreviousData: true,
  });
}

export function useTodo(todolistId: string, todoId: string) {
  return useQuery({
    queryKey: ["todolist", todolistId],
    queryFn: () => getTodolist(todolistId),
    select: (data) => data.todos.find((todo) => todo.todoId === todoId),
    keepPreviousData: true,
  });
}

export function useUserQuery() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
}

export function useUpdateTodolist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      todolistId,
      payload,
    }: {
      todolistId: string;
      payload: TodolistPayloadSchema;
    }) => updateTodolist({ todolistId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries(["todolist"]);
      queryClient.invalidateQueries(["todolists"]);
    },
  });
}

export function useDeleteTodolist() {
  return useMutation({
    mutationFn: (todolistId: string) => deleteTodolist(todolistId),
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({
      todolistId,
      todoId,
      payload,
    }: {
      todolistId: string;
      todoId: string;
      payload: Partial<TodoPayload>;
    }) => {
      return updateTodo({ todolistId, todoId, payload });
    },
    onMutate: async (newTodolist) => {
      await queryClient.cancelQueries({ queryKey: ["todolists"] });
      await queryClient.cancelQueries({
        queryKey: ["todolist", newTodolist.todolistId],
      });

      const previousTodolist = queryClient.getQueryData<TodolistSchema>([
        "todolist",
        newTodolist.todolistId,
      ]);

      const updatedTodos = previousTodolist?.todos.map((todo: any) => {
        if (todo.todoId === newTodolist.todoId) {
          return {
            ...todo,
            ...newTodolist.payload,
          };
        }
        return todo;
      });

      queryClient.setQueryData<TodolistSchema>(
        ["todolist", newTodolist.todolistId],
        (old) => old && { ...old, todos: [...(updatedTodos || [])] }
      );

      return { previousTodolist, newTodolist };
    },
    onError: (err, newTodolist, context) => {
      queryClient.setQueryData(
        ["todos", context?.newTodolist.todolistId],
        context?.previousTodolist
      );
      showNotification({
        id: "update-todolist",
        title: "Error",
        message: "Could not update todolist",
        color: "red",
        icon: <IconX />,
      });
    },
    onSettled: (newTodolist) => {
      queryClient.invalidateQueries({
        queryKey: ["todolist", newTodolist?.todolistId],
      });
      queryClient.invalidateQueries({
        queryKey: ["todolists"],
      });
    },
  });
  return { updateTodo: mutate };
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({
      todolistId,
      todoId,
    }: {
      todolistId: string;
      todoId: string;
    }) => deleteTodo({ todolistId, todoId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["todolist"]);
    },
  });
  return { deleteTodo: mutate };
}

export function useNewTodolist() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ title, description }: TodolistPayloadSchema) =>
      createTodolist({ title, description }),
    onSuccess: () => {
      queryClient.invalidateQueries(["todolists"]);
    },
  });
  return { newTodolist: mutate };
}

export function useNotes() {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    keepPreviousData: true,
  });
}

export function useNote(noteId: string) {
  return useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNote(noteId),
    keepPreviousData: true,
  });
}

export function useNewNote() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ title, content }: NotePayloadSchema) =>
      createNote({ title, content }),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });
  return { newNote: mutate };
}

export function useUpdateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      noteId,
      payload,
    }: {
      noteId: string;
      payload: NotePayloadSchema;
    }) => updateNote({ noteId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries(["note"]);
      queryClient.invalidateQueries(["notes"]);
    },
  });
}

export function useDeleteNote() {
  return useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
  });
}

export function useFavorites() {
  const todolists = useTodolists();
  const notes = useNotes();

  const favoriteTodolists =
    todolists.data && todolists.data.filter((todolist) => todolist.favorite);

  const favoriteNotes =
    notes.data && notes.data.filter((note) => note.favorite);

  const favorites = [
    ...(favoriteTodolists || []),
    ...(favoriteNotes || []),
  ].sort((a, b) => {
    return b.updatedAt.localeCompare(a.updatedAt);
  });
  return { favorites };
}

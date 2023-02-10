import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTodolist,
  deleteTodo,
  deleteTodolist,
  getTodolist,
  getTodolists,
  getUser,
  updateTodo,
  updateTodolist,
} from "../api";
import { TodolistPayloadSchema, TodolistSchema, TodoPayload } from "../types";

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
    staleTime: Infinity,
  });
}

export function useEditTodolist() {
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
    onSuccess: () => {
      queryClient.invalidateQueries(["todolist"]);
    },
    onError: () => {
      showNotification({
        id: "update-todolist",
        title: "Error",
        message: "Could not update todolist",
        color: "red",
        icon: <IconX />,
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

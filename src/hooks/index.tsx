import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTodolist,
  getTodolists,
  getUser,
  updateTodo,
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


export function useUserQuery() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
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

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTodolist,
  getTodolists,
  getUser,
} from "../api";
export function useTodolists() {
  return useQuery({
    queryKey: ["todolists"],
    queryFn: getTodolists,
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

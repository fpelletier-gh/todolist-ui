import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

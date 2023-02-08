import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
  getUser,
} from "../api";

export function useUserQuery() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
  });
}

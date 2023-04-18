import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserSchema } from "../types";
import { useUserQuery } from "../hooks";
import StyledLoader from "../components/styledLoader";
import { useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../api/index";

const UserContext = createContext<{
  user: UserSchema | undefined;
  login: (user: UserSchema) => void;
  logout: () => void;
}>({
  user: undefined,
  login: () => undefined,
  logout: () => undefined,
});

function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSchema | undefined>(undefined);
  const queryClient = useQueryClient();
  const userQuery = useUserQuery();

  useEffect(() => {
    if (userQuery.data) {
      setUser(userQuery.data);
    }
  }, [userQuery.data]);

  function login(newUser: UserSchema) {
    setUser(newUser);
  }

  function logout() {
    logoutApi();
    setUser(undefined);
    queryClient.clear();
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
    localStorage.setItem("REACT_QUERY_OFFLINE_CACHE", "");
  }

  return (
    <UserContext.Provider value={{ user: user, login: login, logout: logout }}>
      {userQuery.isLoading ? <StyledLoader /> : children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { UserContextProvider, useUser };

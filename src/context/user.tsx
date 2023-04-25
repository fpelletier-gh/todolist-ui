import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserSchema } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { getUser } from "../api";

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

  useEffect(() => {
    try {
      async function getUserData() {
        const user = await getUser();
        setUser(user);
      }
      getUserData();
    } catch (e) {}
  }, []);

  function login(newUser: UserSchema) {
    setUser(newUser);
  }

  function logout() {
    setUser(undefined);
    queryClient.clear();
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
    localStorage.setItem("REACT_QUERY_OFFLINE_CACHE", "");
  }

  return (
    <UserContext.Provider value={{ user: user, login: login, logout: logout }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { UserContextProvider, useUser };

import { Loader } from "@mantine/core";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserSchema } from "../types";
import { useUserQuery } from "../hooks";

const UserContext = createContext<{
  user: UserSchema | undefined;
  login: any;
  logout: any;
  // @ts-ignore
}>(null);

function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSchema | undefined>(undefined);

  function login() {
  }

  function logout() {
  }

  return (
    <UserContext.Provider value={{ user: user, login: login, logout: logout }}>
      {userQuery.isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { UserContextProvider, useUser };

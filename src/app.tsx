import Root from "./routes/root";
import ErrorPage from "./error-page";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { UserContextProvider } from "./context/user";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/auth/login";
import Register from "./routes/auth/register";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Todolist from "./routes/todolist";
import LandingPage from "./routes/landingPage";
import RequireAuth from "./routes/requireAuth";
import Layout from "./components/layout";
import { ModalsProvider } from "@mantine/modals";
import SpotlightWrapper from "./routes/spotlightWrapper";
import Profile from "./routes/profile";
import Contact from "./routes/contact";
import Home from "./routes/home";
import Note from "./routes/note";
import { useLocalStorage } from "@mantine/hooks";
import { Analytics } from "@vercel/analytics/react";

export const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "/todolist",
        element: (
          <RequireAuth>
            <SpotlightWrapper>
              <Layout />
            </SpotlightWrapper>
          </RequireAuth>
        ),
        children: [
          {
            path: "/todolist/:todolistId",
            element: <Todolist />,
          },
        ],
      },
      {
        path: "/note",
        element: (
          <RequireAuth>
            <SpotlightWrapper>
              <Layout />
            </SpotlightWrapper>
          </RequireAuth>
        ),
        children: [
          {
            path: "/note/:noteId",
            element: <Note />,
          },
        ],
      },
      {
        path: "/home/:tabValue",
        element: (
          <RequireAuth>
            <SpotlightWrapper>
              <Layout />
            </SpotlightWrapper>
          </RequireAuth>
        ),
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        path: "/user",
        element: (
          <RequireAuth>
            <SpotlightWrapper>
              <Layout />
            </SpotlightWrapper>
          </RequireAuth>
        ),
        children: [
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });

  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: colorScheme,
          }}
        >
          <NotificationsProvider>
            <ModalsProvider>
              <UserContextProvider>
                <RouterProvider router={router} />
                <ReactQueryDevtools
                  initialIsOpen={false}
                  position="bottom-right"
                />
                <Analytics />
              </UserContextProvider>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </PersistQueryClientProvider>
  );
}

export default App;

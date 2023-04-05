import Root from "./routes/root";
import ErrorPage from "./error-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import { useLocalStorage } from "@mantine/hooks";

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
        element: (
          <RequireAuth>
            <SpotlightWrapper>
              <Layout />
            </SpotlightWrapper>
          </RequireAuth>
        ),
        children: [
          {
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
  const queryClient = new QueryClient();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <QueryClientProvider client={queryClient}>
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
              </UserContextProvider>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}

export default App;

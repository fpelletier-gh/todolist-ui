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
import LandingPage from "./routes/landingPage";
import RequireAuth from "./routes/requireAuth";
import Layout from "./components/layout";
import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import Profile from "./routes/profile";

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
        path: "/profile",
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
            element: <Profile />,
          },
        ],
      },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  const queryClient = new QueryClient();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
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
          <NotificationsProvider position="top-center">
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

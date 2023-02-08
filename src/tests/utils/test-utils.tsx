import { render } from "@testing-library/react";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  createBrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { UserContextProvider } from "../../context/user";
import userEvent from "@testing-library/user-event";
import { routes } from "../../app";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  let colorScheme: ColorScheme = "dark";

  const toggleColorScheme = () =>
    (colorScheme = colorScheme === "dark" ? "light" : "dark");

  const { rerender, ...result } = render(
    <ColorSchemeProvider
      colorScheme={"dark"}
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
            <QueryClientProvider client={testQueryClient}>
              <UserContextProvider>
                <BrowserRouter>{ui}</BrowserRouter>
              </UserContextProvider>
            </QueryClientProvider>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <ColorSchemeProvider
          colorScheme={"dark"}
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
                <QueryClientProvider client={testQueryClient}>
                  <UserContextProvider>
                    <BrowserRouter>{rerenderUi}</BrowserRouter>
                  </UserContextProvider>
                </QueryClientProvider>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      ),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}

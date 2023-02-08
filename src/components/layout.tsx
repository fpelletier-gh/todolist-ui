import {
  AppShell,
  Navbar,
  useMantineTheme,
  MediaQuery,
  Footer,
  Header,
  Burger,
  Title,
  CloseButton,
  Group,
  Anchor,
  Center,
} from "@mantine/core";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "./header";
import { Link } from "react-router-dom";

export default function Layout() {
  const theme = useMantineTheme();
  const [isOpen, setIsOpen] = useState(false);

  function toggleNavbar() {
    setIsOpen((opened) => !opened);
  }

  function closeNavbar() {
    setIsOpen(false);
  }

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      layout="alt"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!isOpen}
          width={{ sm: 220, lg: 300 }}
        >
          <Navbar.Section>
            <Group position="apart">
              <Anchor component={Link} variant="text" to="/todolist">
                <Title className="logo">Todolists</Title>
              </Anchor>
              {isOpen && <CloseButton onClick={toggleNavbar} />}
            </Group>
          </Navbar.Section>
          <Navbar.Section grow mt="md">
          </Navbar.Section>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          <Center>Created by Francis Pelletier</Center>
        </Footer>
      }
      header={
        <Header height={{ base: 55, md: 70 }} p="md">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={isOpen}
                onClick={toggleNavbar}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>

            <HeaderComponent />
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}

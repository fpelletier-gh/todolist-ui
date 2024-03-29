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
  ScrollArea,
  createStyles,
  Affix,
} from "@mantine/core";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import HeaderComponent from "./header";
import { Link } from "react-router-dom";
import NewButtonMenu from "./newButtonMenu";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}));

export default function Layout() {
  const { classes } = useStyles();
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
              <Anchor
                component={Link}
                onClick={closeNavbar}
                variant="text"
                to="/"
              >
                <Title className="logo">Todolists</Title>
              </Anchor>
              {isOpen && <CloseButton size="lg" onClick={closeNavbar} />}
            </Group>
          </Navbar.Section>
          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>
              <Sidebar closeNavbar={closeNavbar} />
            </div>
          </Navbar.Section>
        </Navbar>
      }
      footer={
        <Footer
          display="flex"
          sx={{
            fontSize: "14px",
            alignItems: "center",
            justifyContent: "center",
          }}
          height={40}
        >
          Created by
          <Anchor pl={5} href="https://francispelletier.ca">
            Francis Pelletier
          </Anchor>
          , find me on
          <Anchor pl={5} href="https://github.com/fpelletier-gh">
            Github
          </Anchor>
        </Footer>
      }
      header={
        <Header height={{ base: 55 }} p="md">
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
      <Affix position={{ bottom: "60px", right: "30px" }}>
        <NewButtonMenu />
      </Affix>
    </AppShell>
  );
}

import {
  createStyles,
  Container,
  Text,
  Title,
  Button,
  Group,
  Anchor,
  Divider,
} from "@mantine/core";
import { Link } from "react-router-dom";
import ColorSchemeToggleButton from "../components/colorSchemeToggleButton";
import { FeaturesCards } from "../components/featuresCards";
import { useUser } from "../context/user";
import { Dots } from "./dots";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 120,
    paddingBottom: 80,

    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: "relative",
    height: "70vh",
    zIndex: 1,
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    "@media (max-width: 755px)": {
      display: "none",
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  header: {
    zIndex: 10,
    position: "fixed",
    top: 0,
    right: 0,
    color: theme.colorScheme === "dark" ? theme.colors.gray[7] : theme.black,
    padding: theme.spacing.md,
  },

  headerTitle: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    textAlign: "center",
    padding: theme.spacing.md,

    "@media (max-width: 520px)": {
      textAlign: "left",
    },
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    maxWidth: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    margin: "auto",
    paddingTop: "100px",
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      paddingTop: "30px",
      textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export default function LandingPage() {
  const { user, logout } = useUser();
  const { classes } = useStyles();

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Group className={classes.header}>
          {user && (
            <div>
              <Anchor component="button" onClick={logout} variant="text">
                Logout
              </Anchor>
            </div>
          )}
          <ColorSchemeToggleButton />
        </Group>
        <Title className={classes.title}>
          Welcome to{" "}
          <Text
            component="span"
            variant="gradient"
            className={classes.highlight}
            inherit
          >
            Todolists
          </Text>{" "}
          , the ultimate productivity tool for managing your tasks and notes!
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            With our user-friendly interface and robust feature set, you can
            easily stay organized and on top of your to-do list.
          </Text>
          {!user && (
            <div className={classes.controls}>
              <Button
                className={classes.control}
                size="lg"
                variant="default"
                color="gray"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="gradient"
                component={Link}
                to="/register"
                className={classes.control}
                size="lg"
              >
                Register
              </Button>
            </div>
          )}
          {user && (
            <div className={classes.controls}>
              <Button
                component={Link}
                to="/home/all"
                className={classes.control}
                size="lg"
              >
                Welcome{" "}
                {user?.username[0].toUpperCase() + user?.username.slice(1)}
              </Button>
            </div>
          )}
        </Container>
      </div>
      <Divider mx="auto" my="sm" maw="300px" />
      <FeaturesCards />
    </Container>
  );
}

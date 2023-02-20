import {
  createStyles,
  Container,
  Text,
  Title,
  Button,
  Group,
  Anchor,
} from "@mantine/core";
import { Link } from "react-router-dom";
import ColorSchemeToggleButton from "../components/colorSchemeToggleButton";
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
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
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
  // TODO: create a nice landing page
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
        <Title order={3} className={classes.headerTitle} variant="gradient">
          Todolists
        </Title>
        <Title className={classes.title}>
          One simple{" "}
          <Text
            component="span"
            variant="gradient"
            className={classes.highlight}
            inherit
          >
            to do lists
          </Text>{" "}
          application to manage your lists
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            Designed to help you get organized, achieve your goals and never
            forget a thing, todolists will help you stay ahead in your tasks.
          </Text>
        </Container>

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
              to="/todolist"
              className={classes.control}
              size="lg"
            >
              Welcome{" "}
              {user?.username[0].toUpperCase() + user?.username.slice(1)}
            </Button>
          </div>
        )}
      </div>
    </Container>
  );

  /* return ( */
  /*   <Flex w="100%" direction="column" align="center" justify="center" pt="xl"> */
  /*     <Group position="right" w="100%"> */
  /*       <Anchor component={Link} variant="text" to="/"> */
  /*         Home */
  /*       </Anchor> */
  /*       <Anchor component={Link} variant="text" to="/login"> */
  /*         Login */
  /*       </Anchor> */
  /*       <Anchor component={Link} variant="text" to="/register"> */
  /*         Register */
  /*       </Anchor> */
  /*     </Group> */
  /*     <Title order={1} mt="xl"> */
  /*       Todolists */
  /*     </Title> */
  /*     <Text my="lg">A Todolists application to serve all your todo needs</Text> */
  /**/
  /*     {!user && ( */
  /*       <Flex gap="md"> */
  /*         <Button w="90px" variant="filled" component={Link} to="/register"> */
  /*           Register */
  /*         </Button> */
  /*         <Button w="90px" variant="outline" component={Link} to="/login"> */
  /*           Login */
  /*         </Button> */
  /*       </Flex> */
  /*     )} */
  /*     {user && ( */
  /*       <Button component={Link} to="/todolist"> */
  /*         Todolists */
  /*       </Button> */
  /*     )} */
  /*   </Flex> */
  /* ); */
}

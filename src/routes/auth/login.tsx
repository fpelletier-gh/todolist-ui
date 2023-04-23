import {
  Text,
  Button,
  Container,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  createStyles,
  Anchor,
  Loader,
  /* Loader, */
} from "@mantine/core";
/* import { useQueryClient } from "@tanstack/react-query"; */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ColorSchemeToggleButton from "../../components/colorSchemeToggleButton";
/* import StyledLoader from "../../components/styledLoader"; */
import { useUser } from "../../context/user";
import { login } from "../../api";
/* import { useLogin, useUserQuery } from "../../hooks"; */
import { LoginPayloadSchema } from "../../types";
import { Dots } from "../dots";
import { useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

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
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
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

export default function LoginPage() {
  const user = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { classes } = useStyles();

  useEffect(() => {
    if (user.user) {
      navigate("/home/all");
    }
  }, [user.user]);

  function handleCancelClick(): void {
    reset();
    navigate("/");
  }

  const onSubmit = (payload: LoginPayloadSchema) => {
    (async () => {
      try {
        const credential = await login(payload);
        queryClient.invalidateQueries();
        user.login(credential.user);
      } catch (e: any) {
        console.log(e);
        showNotification({
          id: "login",
          title: "Error",
          message:
            e.response.status === 401
              ? "Invalid email or password"
              : "Could not logged in",
          color: "red",
          icon: <IconX />,
        });
      }
    })();
    reset();
  };

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Group className={classes.header}>
          <div>
            <Anchor component={Link} to="/register" variant="link">
              Register
            </Anchor>
          </div>
          <ColorSchemeToggleButton />
        </Group>
        <Title order={3} className={classes.headerTitle} variant="gradient">
          Todolists
        </Title>
        <Title className={classes.title}>Login</Title>

        <Container maw="400px" pt="xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="jane@example.com"
                disabled={isSubmitting}
                required
                {...register("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your strong password"
                disabled={isSubmitting}
                required
                {...register("password")}
              />
              <Group>
                <Button
                  disabled={isSubmitting}
                  px="lg"
                  variant="gradient"
                  type="submit"
                >
                  {isSubmitting ? <Loader /> : "Login"}
                </Button>
                <Button
                  disabled={isSubmitting}
                  variant="subtle"
                  onClick={() => handleCancelClick()}
                  type="button"
                >
                  Cancel
                </Button>
              </Group>
            </Stack>
          </form>
        </Container>
        <Container p={0} mt="xl" pt="xl" size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            Don't have an account?
            <Anchor pl={7} component={Link} to="/register" variant="link">
              Sign up
            </Anchor>
          </Text>
        </Container>
      </div>
    </Container>
  );
}

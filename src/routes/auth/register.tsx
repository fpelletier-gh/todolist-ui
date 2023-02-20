import {
  Text,
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons";
import { Dots } from "../dots";
import ColorSchemeToggleButton from "../../components/colorSchemeToggleButton";

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
    position: "fixed",
    top: 0,
    right: 0,
    color: theme.colorScheme === "dark" ? theme.colors.gray[7] : theme.black,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingRight: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
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

export default function RegisterPage() {
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const navigate = useNavigate();
  const { classes } = useStyles();

  // TODO: Refactor mutation to custom hook
  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>["0"]
  >(registerUser, {
    onMutate: () => {},
    onSuccess: () => {
      showNotification({
        id: "register",
        title: "Success",
        message: "Successfully created account",
      });

      navigate("/login");
    },
    onError: () => {
      showNotification({
        id: "register",
        title: "Error",
        message: "Could not create account",
        color: "red",
        icon: <IconX />,
      });
    },
  });

  function handleCancelClick(): void {
    form.setValues({
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });

    navigate("/");
  }

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Group className={classes.header}>
          <div>
            <Anchor component={Link} to="/login" variant="link">
              Login
            </Anchor>
          </div>
          <ColorSchemeToggleButton />
        </Group>
        <Title className={classes.title}>Register</Title>

        <Container maw="400px" pt="xl">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="Email"
                required
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Username"
                placeholder="Username"
                required
                {...form.getInputProps("username")}
              />
              <PasswordInput
                label="Password"
                placeholder="Password"
                required
                {...form.getInputProps("password")}
              />
              <PasswordInput
                label="Confirm password"
                placeholder="Confirm password"
                required
                {...form.getInputProps("passwordConfirmation")}
              />

              <Group>
                <Button type="submit">Register</Button>
                <Button
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
            Already have an account?
            <Anchor pl={7} component={Link} to="/login" variant="link">
              Log in
            </Anchor>
          </Text>
        </Container>
      </div>
    </Container>
  );
}

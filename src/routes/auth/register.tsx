import {
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api";
import { useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons";

function RegisterPage() {
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const navigate = useNavigate();

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
    <>
      <Container>
        <Title>Register</Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
                  cancel
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default RegisterPage;

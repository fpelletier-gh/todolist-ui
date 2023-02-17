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
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";
import { useUser } from "../../context/user";

function LoginPage() {
  const user = useUser();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // TODO: Refactor mutation to custom hook
  const mutation = useMutation(login, {
    onMutate: () => {
      queryClient.invalidateQueries(["user"]);
    },
    onSuccess: () => {
      const newUser = async () => await user.login();
      navigate("/todolist", { state: { user: newUser, replace: true } });
    },
    onError: () => {
      showNotification({
        id: "update-todolist",
        title: "Error",
        message: "Could not login",
        color: "red",
        icon: <IconX />,
      });
    },
  });

  function handleCancelClick(): void {
    form.setValues({ email: "", password: "" });
    navigate("/");
  }

  return (
    <>
      <Container pt="xl">
        <Title mt="xl">Login</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="jane@example.com"
                required
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your strong password"
                required
                {...form.getInputProps("password")}
              />
              <Group>
                <Button type="submit">Login</Button>
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

export default LoginPage;

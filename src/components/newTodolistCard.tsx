import {
  Text,
  Card,
  Anchor,
  Title,
  Button,
  Group,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useNewTodolist } from "../hooks";
import { TodolistPayloadSchema } from "../types";

export default function NewTodolistCard() {
  const navigate = useNavigate();
  const { newTodolist } = useNewTodolist();
  const focusTrapRef = useFocusTrap();

  function NewTodolistForm() {
    const { register, handleSubmit, reset } = useForm({
      defaultValues: {
        title: "",
        description: "",
      },
    });

    function onSubmit(payload: TodolistPayloadSchema) {
      newTodolist(payload, {
        onSuccess: (data) => {
          () => reset();
          navigate(`/todolist/${data.todolistId}`);
        },
        onError: () => {
          showNotification({
            id: "new-todolist",
            title: "Error",
            message: "Todolist has not been created",
            color: "red",
            icon: <IconX />,
          });
        },
      });
      closeAllModals();
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} ref={focusTrapRef}>
        <Stack>
          <TextInput
            label="Title"
            placeholder="Title"
            data-autofocus
            {...register("title")}
          />
          <Textarea
            label="Description"
            placeholder="Description"
            autosize
            {...register("description")}
          />
          <Group>
            <Button type="submit">Save</Button>
            <Button
              variant="subtle"
              onClick={() => closeAllModals()}
              type="button"
            >
              cancel
            </Button>
          </Group>
        </Stack>
      </form>
    );
  }

  function handleNewTodolistClick() {
    openModal({
      title: "New todolist",
      children: <NewTodolistForm />,
    });
  }

  return (
    <Anchor
      component="button"
      onClick={handleNewTodolistClick}
      td="none"
      underline={false}
    >
      <Card
        shadow="sm"
        maw="400px"
        mih="160px"
        mah="160px"
        p="sm"
        radius="md"
        withBorder
      >
        <Card.Section withBorder ta="left" inheritPadding py="xs">
          <Title order={3} mb="sm" size="lg">
            New +
          </Title>
          <Text size="sm" color="dimmed">
            Add a new todolist
          </Text>
        </Card.Section>
      </Card>
    </Anchor>
  );
}

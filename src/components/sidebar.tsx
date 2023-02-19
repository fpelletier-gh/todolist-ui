import { Button, Flex, Stack, Textarea, TextInput } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useNewTodolist, useTodolists } from "../hooks";
import { TodolistPayloadSchema, TodolistSchema } from "../types";
import NavLink from "./navLink";
import { useFocusTrap } from "@mantine/hooks";
import SubmitButtonGroup from "./submitButtonGroup";

export default function Sidebar({ closeNavbar }: { closeNavbar: () => void }) {
  const todolists = useTodolists();
  const navigate = useNavigate();
  const { newTodolist } = useNewTodolist();
  const focusTrapRef = useFocusTrap();

  // TODO: Refactor new todolist modal to context
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
          <SubmitButtonGroup />
        </Stack>
      </form>
    );
  }

  if (todolists.error instanceof Error) {
    return <Flex>Error: {todolists.error.message}</Flex>;
  }

  function handleNewTodolistClick() {
    closeNavbar();
    openModal({
      title: "New todolist",
      children: <NewTodolistForm />,
    });
  }

  return (
    <Flex direction="column" align="start">
      <Button
        ml="xs"
        my="md"
        variant="gradient"
        onClick={handleNewTodolistClick}
      >
        New todolist
      </Button>
      {todolists.data &&
        todolists.data.map((todolist: TodolistSchema) => (
          <Flex
            key={todolist.todolistId}
            justify="space-between"
            align="center"
            w="100%"
          >
            <NavLink
              todolistId={todolist.todolistId}
              title={todolist.title}
              to={`/todolist/${todolist.todolistId}`}
              closeNavbar={closeNavbar}
            />
          </Flex>
        ))}
    </Flex>
  );
}

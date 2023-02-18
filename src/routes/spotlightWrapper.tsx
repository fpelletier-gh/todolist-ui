import { SpotlightProvider } from "@mantine/spotlight";
import {
  IconCheckbox,
  IconDashboard,
  IconHome,
  IconSearch,
  IconX,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useNewTodolist, useTodolists } from "../hooks";
import { TodolistPayloadSchema, TodolistSchema } from "../types";
import type { SpotlightAction } from "@mantine/spotlight";
import { useForm } from "react-hook-form";
import { showNotification } from "@mantine/notifications";
import { closeAllModals, openModal } from "@mantine/modals";
import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";

export default function SpotlightWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const todolists = useTodolists();
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

  const todolistActions: SpotlightAction[] =
    todolists.data?.map((todolist: TodolistSchema) => {
      const keywords = todolist.todos.map((todo) => todo.title.toLowerCase());
      return {
        title: todolist.title,
        description: todolist.description,
        onTrigger: () => navigate(`/todolist/${todolist.todolistId}`),
        icon: <IconCheckbox size={18} />,
        group: "search",
        keywords: keywords,
      };
    }) || [];

  const actions: SpotlightAction[] = [
    {
      title: "Home",
      description: "Get to the todolists page",
      onTrigger: () => navigate(`/todolist`),
      icon: <IconHome size={18} />,
      group: "main",
    },
    {
      title: "New Todolist",
      description: "Create a new Todolist",
      onTrigger: () => handleNewTodolistClick(),
      icon: <IconDashboard size={18} />,
      group: "main",
    },
    ...todolistActions,
  ];

  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search..."
      shortcut={["mod + k", "/"]}
      nothingFoundMessage="Nothing found..."
    >
      {children}
    </SpotlightProvider>
  );
}

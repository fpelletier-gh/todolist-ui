import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconDots, IconEdit, IconTrash, IconX } from "@tabler/icons";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDeleteTodolist, useEditTodolist, useTodolist } from "../hooks";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { useForm } from "react-hook-form";
import { TodolistPayloadSchema } from "../types";

export default function TodolistMenu({
  todolistId,
  navigatePath = undefined,
  isVisible = true,
}: {
  todolistId: string;
  navigatePath?: string | undefined;
  isVisible?: boolean;
}) {
  const queryClient = useQueryClient();
  const todolist = useTodolist(todolistId);
  const deleteTodolist = useDeleteTodolist();
  const editTodolist = useEditTodolist();
  const navigate = useNavigate();

  function handleDeleteTodolist() {
    deleteTodolist.mutate(todolistId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["todolists"]);
        if (navigatePath) {
          navigate(navigatePath);
        }
        showNotification({
          id: "delete-todolist",
          title: "Success",
          message: "Todolist has been deleted",
        });
      },
    });
  }

  const openDeleteModal = () =>
    openConfirmModal({
      title: "Delete todolist",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete the {todolist.data?.title} todolist
          and all it's todo's?.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => handleDeleteTodolist(),
    });

  const openEditModal = () => {
    if (todolist.data) {
      openModal({
        title: "Edit todolist",
        children: (
          <>
            <EditTodolistForm todolist={todolist.data} />
          </>
        ),
      });
    }
  };

  function EditTodolistForm({ todolist }: { todolist: TodolistPayloadSchema }) {
    const { register, handleSubmit, reset } = useForm({
      defaultValues: {
        title: todolist.title,
        description: todolist.description,
      },
    });

    function onSubmit(payload: { title: string; description: string }) {
      editTodolist.mutate(
        { todolistId, payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["todolists"]);
            () => reset();
          },
          onError: () => {
            showNotification({
              id: "edit-todolist",
              title: "Error",
              message: "Todolist has not been updated",
              color: "red",
              icon: <IconX />,
            });
          },
        }
      );
      closeAllModals();
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput label="Title" placeholder="Title" {...register("title")} />
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

  return (
    <Menu shadow="md" width={200} zIndex="10">
      <Menu.Target>
        <ActionIcon
          component="button"
          onClick={(e) => {
            e.preventDefault();
          }}
          sx={{
            visibility: isVisible ? "visible" : "hidden",
          }}
          variant="transparent"
        >
          <IconDots size={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={(e) => {
            e.preventDefault();
            openEditModal();
          }}
          icon={<IconEdit size={14} />}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          onClick={(e) => {
            e.preventDefault();
            openDeleteModal();
          }}
          color="red"
          icon={<IconTrash size={14} />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

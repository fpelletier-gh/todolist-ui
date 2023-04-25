import {
  ActionIcon,
  Group,
  Menu,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconDots, IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useDeleteTodolist, useUpdateTodolist, useTodolist } from "../hooks";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { useForm } from "react-hook-form";
import { TodolistPayloadSchema } from "../types";
import SubmitButtonGroup from "./submitButtonGroup";
import { FavoriteTodolist } from "./favorite";

export default function TodolistMenu({
  todolistId,
  isVisible = true,
}: {
  todolistId: string;
  isVisible?: boolean;
}) {
  const queryClient = useQueryClient();
  const todolist = useTodolist(todolistId);
  const deleteTodolist = useDeleteTodolist();
  const editTodolist = useUpdateTodolist();
  const navigate = useNavigate();
  const location = useLocation();

  function handleDeleteTodolist() {
    deleteTodolist.mutate(todolistId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["todolists"]);
        if (location.pathname.includes("todolist_")) {
          navigate("/home/todolists");
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
            minRows={3}
            autosize
            {...register("description")}
          />
          <SubmitButtonGroup />
        </Stack>
      </form>
    );
  }

  return (
    <Group spacing="xs" noWrap>
      {todolist.data && <FavoriteTodolist todolist={todolist.data} />}
      <Menu shadow="md" offset={-1} zIndex="10" withArrow>
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

        <Menu.Dropdown
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[3],
          })}
        >
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
    </Group>
  );
}

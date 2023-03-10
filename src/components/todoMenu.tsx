import { ActionIcon, Menu, Stack, Text, TextInput } from "@mantine/core";
import { IconDots, IconEdit, IconTrash, IconX } from "@tabler/icons";
import { useDeleteTodo, useTodo, useUpdateTodo } from "../hooks";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import SubmitButtonGroup from "./submitButtonGroup";

export default function TodoMenu({
  todolistId,
  todoId,
  isVisible = true,
}: {
  todolistId: string;
  todoId: string;
  isVisible: boolean;
}) {
  const queryClient = useQueryClient();
  const { deleteTodo } = useDeleteTodo();
  const { updateTodo } = useUpdateTodo();
  const todo = useTodo(todolistId, todoId);

  function handleDeleteTodo() {
    deleteTodo({ todolistId, todoId });
  }

  const openDeleteModal = () =>
    openConfirmModal({
      title: "Delete todo",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete the {todo.data?.title} todo?.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => handleDeleteTodo(),
    });

  const openEditModal = () => {
    if (todo.data) {
      openModal({
        title: "Edit todo",
        children: (
          <>
            <EditTodolistForm todolist={todo.data} />
          </>
        ),
      });
    }
  };

  function EditTodolistForm({ todolist }: any) {
    const { register, handleSubmit, reset } = useForm({
      defaultValues: {
        title: todolist.title,
      },
    });

    function onSubmit(payload: { title: string }) {
      updateTodo(
        { todolistId, todoId, payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["todolist"]);
            () => reset();
          },
          onError: () => {
            showNotification({
              id: "edit-todo",
              title: "Error",
              message: "Todo has not been updated",
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
          <SubmitButtonGroup />
        </Stack>
      </form>
    );
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          sx={{
            visibility: isVisible ? "visible" : "hidden",
          }}
          variant="transparent"
        >
          <IconDots size={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={openEditModal} icon={<IconEdit size={14} />}>
          Edit
        </Menu.Item>
        <Menu.Item
          onClick={openDeleteModal}
          color="red"
          icon={<IconTrash size={14} />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

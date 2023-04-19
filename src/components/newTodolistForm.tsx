import { Stack, Textarea, TextInput } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { TodolistPayloadSchema, TodolistSchema } from "../types";
import { useFocusTrap } from "@mantine/hooks";
import SubmitButtonGroup from "./submitButtonGroup";
import { UseMutateFunction } from "@tanstack/react-query";

interface NewTodolistFormProps {
  navigate: NavigateFunction;
  newTodolist: UseMutateFunction<
    TodolistSchema,
    unknown,
    TodolistPayloadSchema,
    unknown
  >;
}

export function openNewTodolistModal(
  navigate: NavigateFunction,
  newTodolist: UseMutateFunction<
    TodolistSchema,
    unknown,
    TodolistPayloadSchema,
    unknown
  >
) {
  openModal({
    title: "New todolist",
    children: <NewTodolistForm navigate={navigate} newTodolist={newTodolist} />,
  });
}

export default function NewTodolistForm({
  navigate,
  newTodolist,
}: NewTodolistFormProps) {
  const focusTrapRef = useFocusTrap();
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
          minRows={3}
          autosize
          {...register("description")}
        />
        <SubmitButtonGroup />
      </Stack>
    </form>
  );
}

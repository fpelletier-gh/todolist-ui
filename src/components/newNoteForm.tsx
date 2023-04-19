import { Stack, Textarea, TextInput } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { NotePayloadSchema, NoteSchema } from "../types";
import { useFocusTrap } from "@mantine/hooks";
import SubmitButtonGroup from "./submitButtonGroup";
import { UseMutateFunction } from "@tanstack/react-query";

interface NewNoteFormProps {
  navigate: NavigateFunction;
  newNote: UseMutateFunction<NoteSchema, unknown, NotePayloadSchema, unknown>;
}

export function openNewNoteModal(
  navigate: NavigateFunction,
  newNote: UseMutateFunction<NoteSchema, unknown, NotePayloadSchema, unknown>
) {
  openModal({
    title: "New note",
    children: <NewNoteForm navigate={navigate} newNote={newNote} />,
  });
}

export default function NewNoteForm({ navigate, newNote }: NewNoteFormProps) {
  const focusTrapRef = useFocusTrap();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(payload: NotePayloadSchema) {
    newNote(payload, {
      onSuccess: (data) => {
        () => reset();
        navigate(`/note/${data.noteId}`);
      },
      onError: () => {
        showNotification({
          id: "new-note",
          title: "Error",
          message: "Note has not been created",
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
          label="Content"
          placeholder="Content"
          autosize
          minRows={6}
          {...register("content")}
        />
        <SubmitButtonGroup />
      </Stack>
    </form>
  );
}

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
import { useDeleteNote, useUpdateNote, useNote } from "../hooks";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { useForm } from "react-hook-form";
import { NotePayloadSchema } from "../types";
import SubmitButtonGroup from "./submitButtonGroup";
import { FavoriteNote } from "./favorite";

export default function NoteMenu({
  noteId,
  isVisible = true,
}: {
  noteId: string;
  isVisible?: boolean;
}) {
  const queryClient = useQueryClient();
  const note = useNote(noteId);
  const deleteNote = useDeleteNote();
  const editNote = useUpdateNote();
  const navigate = useNavigate();
  const location = useLocation();

  function handleDeleteNote() {
    deleteNote.mutate(noteId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["notes"]);
        if (location.pathname.includes("note_")) {
          navigate("/home/notes");
        }
        showNotification({
          id: "delete-note",
          title: "Success",
          message: "Note has been deleted",
        });
      },
    });
  }

  const openDeleteModal = () =>
    openConfirmModal({
      title: "Delete note",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete the {note.data?.title} note and all
          it's todo's?.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => handleDeleteNote(),
    });

  const openEditModal = () => {
    if (note.data) {
      openModal({
        title: "Edit note",
        children: (
          <>
            <EditNoteForm note={note.data} />
          </>
        ),
      });
    }
  };

  function EditNoteForm({ note }: { note: NotePayloadSchema }) {
    const { register, handleSubmit, reset } = useForm({
      defaultValues: {
        title: note.title,
        content: note.content,
      },
    });

    function onSubmit(payload: { title: string; content: string }) {
      editNote.mutate(
        { noteId, payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["notes"]);
            () => reset();
          },
          onError: () => {
            showNotification({
              id: "edit-note",
              title: "Error",
              message: "Note has not been updated",
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

  return (
    <Group spacing="xs" noWrap>
      {note.data && <FavoriteNote note={note.data} />}
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
                : theme.colors.gray[2],
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

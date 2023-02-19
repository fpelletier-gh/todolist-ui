import { Button, Group } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";

export default function SubmitButtonGroup() {
  return (
    <Group spacing="xs">
      <Button px="lg" size="xs" variant="gradient" type="submit">
        Save
      </Button>
      <Button
        size="xs"
        variant="subtle"
        onClick={() => closeAllModals()}
        type="button"
      >
        cancel
      </Button>
    </Group>
  );
}

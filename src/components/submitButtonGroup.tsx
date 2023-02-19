import { Button, Group } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";

export default function SubmitButtonGroup() {
  return (
    <Group spacing="xs">
      <Button px="lg" variant="gradient" type="submit">
        Save
      </Button>
      <Button variant="subtle" onClick={() => closeAllModals()} type="button">
        cancel
      </Button>
    </Group>
  );
}

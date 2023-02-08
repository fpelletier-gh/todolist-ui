import {
  Text,
  Card,
  Anchor,
  Title,
} from "@mantine/core";

export default function NewTodolistCard() {
  return (
    <Anchor
      component="button"
      td="none"
      underline={false}
    >
      <Card
        shadow="sm"
        maw="400px"
        mih="160px"
        mah="160px"
        p="sm"
        radius="md"
        withBorder
      >
        <Card.Section withBorder ta="left" inheritPadding py="xs">
          <Title order={3} mb="sm" size="lg">
            New +
          </Title>
          <Text size="sm" color="dimmed">
            Add a new todolist
          </Text>
        </Card.Section>
      </Card>
    </Anchor>
  );
}

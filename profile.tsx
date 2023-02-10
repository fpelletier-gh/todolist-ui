import { Text, Title, Card, Group, Avatar } from "@mantine/core";
import { useUser } from "../context/user";

export default function Profile() {
  const { user } = useUser();
  const username = user?.username
    ? user?.username[0].toUpperCase() + user?.username.slice(1)
    : "";

  return (
    <Card shadow="sm" maw="400px" mih="160px" p="lg" radius="md" withBorder>
      <Card.Section py="md" ta="center">
        <Avatar
          variant="filled"
          mx="auto"
          color="blue"
          size={200}
          className="avatar"
          sx={{
            borderRadius: "50%",
          }}
        >
          {user?.username[0].toUpperCase()}
        </Avatar>
      </Card.Section>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart" noWrap>
          <Title order={2}>{username}</Title>
        </Group>
        <Text size="sm" color="dimmed">
          {user?.email}
        </Text>
      </Card.Section>
    </Card>
  );
}

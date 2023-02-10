import { Text, Title, Card, Group, Anchor, Stack } from "@mantine/core";

export default function Contact() {
  // TODO: add email contact form and add style
  return (
    <Card shadow="sm" maw="400px" mih="160px" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart" noWrap>
          <Title order={2}>Contact</Title>
        </Group>
        <Stack mt="md">
          <Anchor
            href="https://francispelletier.ca#contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact me
          </Anchor>
          <Anchor
            href="https://github.com/fpelletier-gh"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find me on github
          </Anchor>
        </Stack>
      </Card.Section>
    </Card>
  );
}

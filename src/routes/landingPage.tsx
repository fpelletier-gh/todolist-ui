import { Text, Flex, Title, Button } from "@mantine/core";

export default function LandingPage() {
  // TODO: create a nice landing page
  return (
    <Flex direction="column" align="center" justify="center">
      <Title order={1}>Todolists</Title>
      <Text>A Todolists application to server all your todo needs</Text>
    </Flex>
  );
}

import { Text, Flex, Title, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useUser } from "../context/user";

export default function LandingPage() {
  // TODO: create a nice landing page
  const { user } = useUser();
  return (
    <Flex direction="column" align="center" justify="center">
      <Title order={1} mt="xl">
        Todolists
      </Title>
      <Text my="lg">A Todolists application to serve all your todo needs</Text>

      {!user && (
        <Flex gap="md">
          <Button w="90px" variant="filled" component={Link} to="/register">
            Register
          </Button>
          <Button w="90px" variant="outline" component={Link} to="/login">
            Login
          </Button>
        </Flex>
      )}
      {user && (
        <Button component={Link} to="/todolist">
          Todolists
        </Button>
      )}
    </Flex>
  );
}

import { Text, Flex, Title, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useUser } from "../context/user";

export default function LandingPage() {
  // TODO: create a nice landing page
  const { user } = useUser();
  return (
    <Flex direction="column" align="center" justify="center">
      <Title order={1}>Todolists</Title>
      <Text>A Todolists application to server all your todo needs</Text>

      {!user && (
        <Flex>
          <Button variant="light" component={Link} to="/login">
            Login
          </Button>
          <Button variant="filled" component={Link} to="/register">
            Register
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

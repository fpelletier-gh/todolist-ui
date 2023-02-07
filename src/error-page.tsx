import { Title, Text, Container, Anchor } from "@mantine/core";
import { Link, useRouteError } from "react-router-dom";
import { useUser } from "./context/user";

export default function ErrorPage() {
  const { user } = useUser();
  const error: any = useRouteError();
  console.error(error);

  return (
    <Container py="lg" id="error-page">
      <Title order={2}>Error</Title>
      <Text mt="lg">An unexpected error has occurred.</Text>
      <Text mb="lg">
        <i>{error.statusText || error.message}</i>
      </Text>
      {!user && (
        <Anchor component={Link} underline={false} to="/" id="home">
          Back to home page
        </Anchor>
      )}
      {user && (
        <Anchor component={Link} underline={false} to="/todolist" id="home">
          Back to todolists page
        </Anchor>
      )}
    </Container>
  );
}

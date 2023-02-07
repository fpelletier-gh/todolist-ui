import { Outlet } from "react-router-dom";
import { Container, Flex } from "@mantine/core";

function Root() {
  return (
    <main className="App">
      <Container>
        <Flex justify="center">
          <Outlet />
        </Flex>
      </Container>
    </main>
  );
}

export default Root;

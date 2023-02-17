import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container, Flex } from "@mantine/core";
import { useEffect } from "react";

function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const pageAccessedByReload =
      (window.performance.navigation &&
        window.performance.navigation.type === 1) ||
      window.performance
        .getEntriesByType("navigation")
        // @ts-ignore
        .map((nav) => nav.type)
        .includes("reload");

    if (pageAccessedByReload) {
      const lastLocation = localStorage.getItem("last_location");
      navigate(lastLocation || "/todolist", { replace: true });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("last_location", location.pathname);
  });

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

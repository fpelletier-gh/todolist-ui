import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container, Flex } from "@mantine/core";
import { useEffect } from "react";

function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // @ts-ignore
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
      const lastLocation = localStorage.getItem("last_location");
      if (lastLocation) {
        const lastLocationPathname = JSON.parse(lastLocation).pathname;
        navigate(lastLocationPathname);
      }
      localStorage.setItem("last_location", JSON.stringify(location));
    }

    const saveLastLocation = () => {
      localStorage.setItem("last_location", JSON.stringify(location));
    };
    window.addEventListener("beforeunload", saveLastLocation);
    return () => {
      window.removeEventListener("beforeunload", saveLastLocation);
    };
  }, []);

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

import { Text, Container, Anchor, Tabs } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Favorites from "./favorites";
import Notes from "./notes";
import Todolists from "./todolists";

export default function Home() {
  const maxCardNumber = 3;
  const navigate = useNavigate();
  const { tabValue } = useParams();
  const largeScreen = useMediaQuery("(min-width: 30em)");

  const [maxFavoritesCardNumber, setMaxFavoritesCardNumber] = useState<
    number | undefined
  >(maxCardNumber);
  const [maxTodolistsCardNumber, setMaxTodolistsCardNumber] = useState<
    number | undefined
  >(maxCardNumber);
  const [maxNotesCardNumber, setMaxNotesCardNumber] = useState<
    number | undefined
  >(maxCardNumber);

  function toggleShowMoreFavorites() {
    if (maxFavoritesCardNumber === undefined) {
      setMaxFavoritesCardNumber(maxCardNumber);
    } else {
      setMaxFavoritesCardNumber(undefined);
    }
  }

  function toggleShowMoreTodolists() {
    if (maxTodolistsCardNumber === undefined) {
      setMaxTodolistsCardNumber(maxCardNumber);
    } else {
      setMaxTodolistsCardNumber(undefined);
    }
  }

  function toggleShowMoreNotes() {
    if (maxNotesCardNumber === undefined) {
      setMaxNotesCardNumber(maxCardNumber);
    } else {
      setMaxNotesCardNumber(undefined);
    }
  }

  return (
    <Container px="0">
      <Tabs
        value={tabValue}
        onTabChange={(value) => navigate(`/home/${value}`)}
      >
        <Tabs.List
          position={largeScreen ? "left" : "center"}
          sx={(theme) => ({
            position: "sticky",
            top: "55px",
            zIndex: 50,
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.white,
          })}
        >
          <Tabs.Tab value="all">All</Tabs.Tab>
          <Tabs.Tab value="favorites">Favorites</Tabs.Tab>
          <Tabs.Tab value="todolists">Todolists</Tabs.Tab>
          <Tabs.Tab value="notes">Notes</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="all">
          <Favorites maxCardNumber={maxFavoritesCardNumber} titleLink={true} />
          <Text p="md">
            <Anchor component="button" onClick={toggleShowMoreFavorites}>
              Show {maxFavoritesCardNumber ? "all" : "less"} Favorites
            </Anchor>
          </Text>
          <Todolists maxCardNumber={maxTodolistsCardNumber} titleLink={true} />
          <Text p="md">
            <Anchor component="button" onClick={toggleShowMoreTodolists}>
              Show {maxTodolistsCardNumber ? "all" : "less"} todolists
            </Anchor>
          </Text>
          <Notes maxCardNumber={maxNotesCardNumber} titleLink={true} />
          <Text p="md">
            <Anchor component="button" onClick={toggleShowMoreNotes}>
              Show {maxNotesCardNumber ? "all" : "less"} notes
            </Anchor>
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value="favorites">
          <Favorites />
        </Tabs.Panel>
        <Tabs.Panel value="todolists">
          <Todolists />
        </Tabs.Panel>
        <Tabs.Panel value="notes">
          <Notes />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

import { Text } from "@mantine/core";
import {
  IconHome,
  IconListDetails,
  IconStar,
} from "@tabler/icons-react";
import {
  useNewTodolist,
  useTodolists,
} from "../hooks";
import LinksGroup from "./linksGroup";
import LinkNav from "./linkNav";
import { useNavigate } from "react-router-dom";
import LinksNewGroup from "./linksNewGroup";

export default function Sidebar({ closeNavbar }: { closeNavbar: () => void }) {
  const navigate = useNavigate();
  const { newTodolist } = useNewTodolist();
  const todolists = useTodolists();

  if (todolists.error instanceof Error) {
    return <Text>Error: {todolists.error.message}</Text>;
  }

  const todolistsLinks =
    todolists.data &&
    todolists.data.map((todolist: TodolistSchema) => {
      return {
        label: todolist.title,
        link: `/todolist/${todolist.todolistId}`,
        id: todolist.todolistId,
      };
    });

    });

  return (
    <>
      <LinkNav
        label="Home"
        icon={IconHome}
        link="/home/all"
        closeNavbar={closeNavbar}
      />
      <LinksGroup
        label="Todolists"
        icon={IconListDetails}
        links={todolistsLinks}
        closeNavbar={closeNavbar}
      />
    </>
  );
}

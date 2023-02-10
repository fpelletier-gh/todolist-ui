import { Anchor, Box, Text, Group } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import TodolistMenu from "./todolistMenu";

export default function NavLink({
  to,
  title,
  todolistId,
  closeNavbar,
}: {
  to: string;
  title: string;
  todolistId: string;
  closeNavbar: () => void;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Anchor
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      underline={false}
      w="100%"
      px="xs"
      sx={(theme) => ({
        borderRadius: "5px",
        overflowX: "hidden",
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[3],
        },
      })}
      component={Link}
      to={to}
      key={todolistId}
    >
      <Group
        w="100%"
        sx={{ overflow: "hidden" }}
        position="apart"
        noWrap={true}
        onClick={closeNavbar}
      >
        <Text truncate={true}>{title}</Text>
        <Box mr="md" w="10px">
          <TodolistMenu
            key={todolistId}
            isVisible={isVisible}
            todolistId={todolistId}
          />
        </Box>
      </Group>
    </Anchor>
  );
}

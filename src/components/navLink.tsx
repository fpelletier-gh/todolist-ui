import { Anchor, Box, Text, Group } from "@mantine/core";
import { Link } from "react-router-dom";

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
      </Group>
    </Anchor>
  );
}

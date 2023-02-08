import { Anchor, Avatar, Button, Group, Menu, Text } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useSpotlight } from "@mantine/spotlight";
import { IconSearch, IconX } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/user";
import ColorSchemeToggleButton from "./colorSchemeToggleButton";
import Search from "./search";

export default function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const spotlight = useSpotlight();

  const logoutMutation = useMutation(logout, {
    onMutate: () => {
      showNotification({
        id: "logout",
        title: "Logging out...",
        message: "",
      });
    },
    onSuccess: () => {
      logout();

      updateNotification({
        id: "logout",
        title: "Success",
        message: "Successfully logged out",
      });
      navigate("/login");
    },
    onError: () => {
      updateNotification({
        id: "logout",
        title: "Error",
        message: "Could not logout",
        color: "red",
        icon: <IconX />,
      });
    },
  });

  function handleLogoutClick() {
    logoutMutation.mutate();
  }

  return (
    <>
      {user && (
        <>
          <Search />
          <Group noWrap>
            <ColorSchemeToggleButton />
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar
                  variant="filled"
                  color="blue"
                  radius="xl"
                  className="avatar"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  {user?.username[0].toUpperCase()}
                </Avatar>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>
                  <Text size="sm">
                    Signed in as{" "}
                    {user.username
                      ? user?.username[0].toUpperCase() +
                        user?.username.slice(1)
                      : ""}
                  </Text>
                  <Text size="xs">{user.email}</Text>
                </Menu.Label>
                <Menu.Divider />
                <Menu.Item component={Link} to="/todolist">
                  Home
                </Menu.Item>
                <Menu.Item component={Link} to="/profile">
                  Profile
                </Menu.Item>
                <Menu.Item component={Link} to="/todolist/contact">
                  Contact
                </Menu.Item>
                <Menu.Item
                  icon={<IconSearch size={14} />}
                  rightSection={
                    <Text size="xs" color="dimmed">
                      Ctrl-K
                    </Text>
                  }
                  onClick={() => {
                    spotlight.openSpotlight();
                  }}
                >
                  Search
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" onClick={handleLogoutClick}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </>
      )}
    </>
  );
}

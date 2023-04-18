import { Avatar, Group, MediaQuery, Menu, Text } from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";
import {
  IconHome,
  IconMail,
  IconSearch,
  IconStar,
  IconUserCircle,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/user";
import ColorSchemeToggleButton from "./colorSchemeToggleButton";
import Search from "./search";

export default function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const spotlight = useSpotlight();

  function handleLogoutClick() {
    logout();
    navigate("/");
  }

  return (
    <>
      {user && (
        <>
          <Search />
          <Group noWrap>
            <ColorSchemeToggleButton />
            <Menu shadow="md" arrowOffset={20} width={200} withArrow>
              <Menu.Target>
                <Avatar
                  variant="gradient"
                  color="blue"
                  radius="xl"
                  className="avatar"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  {user.username[0].toUpperCase()}
                </Avatar>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>
                  <Text size="sm">
                    Signed in as{" "}
                    {user.username
                      ? user.username[0].toUpperCase() + user.username.slice(1)
                      : ""}
                  </Text>
                  <Text size="xs">{user.email}</Text>
                </Menu.Label>
                <Menu.Divider />
                <Menu.Item
                  icon={<IconHome size={14} />}
                  component={Link}
                  to="/home/all"
                >
                  Home
                </Menu.Item>
                <Menu.Item
                  icon={<IconUserCircle size={14} />}
                  component={Link}
                  to="/user/profile"
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  icon={<IconMail size={14} />}
                  component={Link}
                  to="/user/contact"
                >
                  Contact
                </Menu.Item>
                <Menu.Item
                  icon={<IconSearch size={14} />}
                  rightSection={
                    <MediaQuery
                      smallerThan="sm"
                      styles={{ visibility: "hidden" }}
                    >
                      <Text size="xs" color="dimmed">
                        Ctrl-K
                      </Text>
                    </MediaQuery>
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

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export default function colorSchemeToggleButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  // TODO: fix the bug with react query when switching color scheme without page reload
  const handleToggleButtonClick = () => {
    toggleColorScheme();
    window.location.reload();
  };

  return (
    <ActionIcon
      variant="transparent"
      color={dark ? "blue.2" : "blue"}
      onClick={handleToggleButtonClick}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );
}

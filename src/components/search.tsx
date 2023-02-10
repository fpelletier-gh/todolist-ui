import { Button, Text } from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons";

export default function Search() {
  const spotlight = useSpotlight();

  return (
    <Button
      variant="outline"
      size="xs"
      color="gray.7"
      radius="md"
      leftIcon={<IconSearch size={14} />}
      onClick={() => {
        spotlight.openSpotlight();
      }}
      sx={(theme) => ({
        borderColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[4],
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[2],
        },
      })}
    >
      Search
      <Text
        color="gray.7"
        mr="0"
        px="xs"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[3],
          borderRadius: theme.radius.sm,
          marginLeft: "40px",
        })}
      >
        Ctrl + K
      </Text>
    </Button>
  );
}

import {
  createStyles,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
} from "@mantine/core";
import {
  IconBrush,
  IconListDetails,
  IconNotes,
  IconStar,
  IconUser,
} from "@tabler/icons-react";

const featuresData = [
  {
    title: "Create todolists",
    description:
      "Whether you're juggling multiple projects or simply need to keep track of your daily tasks, our application allows you to create and manage multiple to-do lists. You can easily add, edit, and delete items on your lists.",
    icon: IconListDetails,
  },
  {
    title: "Take notes",
    description:
      "Our application also lets you take and organize notes, so you can keep track of ideas, thoughts, and important information. You can create and search through your notes for specific keywords.",
    icon: IconNotes,
  },
  {
    title: "Favorites",
    description:
      'With our application, you can mark your favorite to-do lists and notes for quick access. Simply click the "star" button and the list or note will be added to your favorites list, which you can access from the main menu',
    icon: IconStar,
  },
  {
    title: "Theme",
    description:
      "Our application also features a light and dark theme, allowing you to choose the theme that works best for you. Whether you prefer a bright, white background or a dark background for better visibility, our application has you covered.",
    icon: IconBrush,
  },
  {
    title: "Access from anywhere",
    description:
      "Our application is accessible from anywhere with an internet connection, so you can manage your tasks and notes from your computer, tablet, or smartphone.",
    icon: IconUser,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: "34px",
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: "24px",
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: "45px",
      height: "2px",
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${"1px"} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: "45px",
      height: "2px",
      marginTop: theme.spacing.sm,
    },
  },
}));

export function FeaturesCards() {
  const { classes, theme } = useStyles();
  const features = featuresData.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      p="xl"
    >
      <feature.icon size={"50px"} stroke={2} color={theme.fn.primaryColor()} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Features
      </Title>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Here are some of the key features you can expect from our application
      </Text>
      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
      <Text c="dimmed" ta="center" mt="70px">
        Start using Todolists today and take the first step towards a more
        productive and organized life!
      </Text>
    </Container>
  );
}

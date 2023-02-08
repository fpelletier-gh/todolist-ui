import {
  Text,
  Card,
  Anchor,
  Group,
  Title,
  Flex,
  Checkbox,
} from "@mantine/core";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TodolistSchema, TodoSchema } from "../types";

export default function TodolistCard({
  todolist,
}: {
  todolist: TodolistSchema;
}) {
  return (
    <Anchor
      component={Link}
      key={todolist.todolistId}
      td="none"
      underline={false}
      to={`/todolist/${todolist.todolistId}`}
    >
      <Card
        shadow="sm"
        maw="400px"
        mih="160px"
        mah="160px"
        p="sm"
        radius="md"
        withBorder
      >
        <Card.Section withBorder inheritPadding py="xs">
          <Group noWrap={true} position="apart">
            <Title truncate={true} order={3} size="lg">
              {todolist.title}
            </Title>
          </Group>
          <Text truncate={true} size="sm" color="dimmed">
            {todolist.description}
          </Text>
        </Card.Section>
        <Flex pt="md" ref={ref} direction="column" id={todolist.todolistId}>
          {todolist.todos.map((todo: TodoSchema) => (
            <Checkbox
              display="flex"
              key={todo.todoId}
              checked={todo.complete}
              onClick={handleCheckboxClick}
              label={todo.title}
              sx={{
                lineHeight: 1,
                paddingBottom: "3px",
              }}
              styles={styles.checkbox}
              size="xs"
              radius="sm"
              readOnly={true}
            />
          ))}
          {!todolist.todos[0] && (
            <Text align="center" fw="500">
              No todo
            </Text>
          )}
        </Flex>
      </Card>
    </Anchor>
  );
}

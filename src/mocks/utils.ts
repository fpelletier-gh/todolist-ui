import { TodolistSchema, TodoSchema, UserSchema } from "../types";

export const user: UserSchema = {
  _id: "63c751fca1f2de672f60a517",
  email: "userOne@test.com",
  username: "userOne",
  createdAt: "2023-01-18T01:57:16.458Z",
  updatedAt: "2023-01-18T01:57:16.458Z",
  session: "63d6bf35a1f2de672f614a30",
  iat: 1675213057,
  exp: 1675213957,
};

export const session = {
  accessToken:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JkYzFiMDA5MWUxZWMxYzIwYjE4YzgiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6Int7dXNlcm5hbWV9fSIsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMTBUMTk6NTE6MTMuMDAxWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTBUMTk6NTE6MTMuMDAxWiIsIl9fdiI6MCwic2Vzc2lvbiI6IjYzZDliZTE5YTFmMmRlNjcyZjYxNTEzMSIsImlhdCI6MTY3NTIxNDM2MSwiZXhwIjoxNjc1MjE1MjYxfQ.Qkiwx0wlaZv8JU4OFCBdAXVU6hp5AdUMSVKZCBXgCUaVg-LUavnHAJt-ji2iN8_GNEPppIN1wqNlOxcJ7vD7RqWXO4OXVAe5ndMpkj4ZytbQEYnjm1l-YD9-RU99AKSXrotHH-2t5C5OgfkDP9o6IB8aui7AqHYoNaQYHH_JNKc",
  refreshToken:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JkYzFiMDA5MWUxZWMxYzIwYjE4YzgiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6Int7dXNlcm5hbWV9fSIsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMTBUMTk6NTE6MTMuMDAxWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTBUMTk6NTE6MTMuMDAxWiIsIl9fdiI6MCwic2Vzc2lvbiI6IjYzZDliZTE5YTFmMmRlNjcyZjYxNTEzMSIsImlhdCI6MTY3NTIxNDM2MSwiZXhwIjoxNzA2NzcxOTYxfQ.TP6jH2H8jYqo5_hrPO9yBbK9viIvzXUrwYvN0kIMAavQFc-7sve2Q-p-ZkI_w--91Ru6JJuvrleyTT90ykEdvELQy3SLkIOcnYo4WBinCR-FM2khJQlwPWW2_yIiAR3WX6N1FqYmqaXrKyuobNDAcPkoPbCBRjwjgOx4xlha2Ec",
};

export const todolistWithTodos: TodolistSchema = {
  _id: "63d6bc97a1f2de672f614a07",
  user: "63c751fca1f2de672f60a517",
  title: "Todolist one",
  description: "A list about the first todolist",
  valid: true,
  todolistId: "todolist_9b425417-86f6-4f4f-8c8c-ecf15d00574b",
  todos: [
    {
      title: "Todo one",
      complete: true,
      _id: "63d6bd1ea1f2de672f614a12",
      createdAt: "2023-01-29T18:38:22.628Z",
      updatedAt: "2023-01-29T18:38:27.378Z",
      todoId: "todo_031e6038-7d34-4cbd-a773-774f12f21919",
    },
    {
      title: "Todo two",
      complete: false,
      _id: "63d6bf47a1f2de672f614a3a",
      createdAt: "2023-01-29T18:47:35.688Z",
      updatedAt: "2023-01-31T00:57:31.960Z",
      todoId: "todo_04e089e8-ee22-4804-b639-620b22ae4c0d",
    },
  ],
  createdAt: "2023-01-29T18:36:07.137Z",
  updatedAt: "2023-01-29T18:38:27.378Z",
  __v: 0,
};

export const todolists: TodolistSchema[] = [
  {
    _id: "63d6bf43a1f2de672f614a34",
    user: "63c751fca1f2de672f60a517",
    title: "Todolist two",
    description: "A list about todolist two",
    valid: true,
    todolistId: "todolist_e9d77f60-df99-4f70-9059-f41183b64a10",
    todos: [
      {
        title: "Todo one from todolist two",
        complete: true,
        _id: "63d6bf47a1f2de672f614a3a",
        createdAt: "2023-01-29T18:47:35.688Z",
        updatedAt: "2023-01-31T00:57:31.960Z",
        todoId: "todo_04e089e8-ee22-4804-b639-620b22ae4c0d",
      },
      {
        title: "Todo two from todolist two",
        complete: false,
        _id: "63d6bf4aa1f2de672f614a41",
        createdAt: "2023-01-29T18:47:38.638Z",
        updatedAt: "2023-01-29T18:47:38.638Z",
        todoId: "todo_a09ec8f7-e0cd-487a-a1dc-9124725f69da",
      },
    ],
    createdAt: "2023-01-29T18:47:31.577Z",
    updatedAt: "2023-01-31T00:57:31.960Z",
    __v: 0,
  },
  {
    _id: "63d6bc97a1f2de672f614a07",
    user: "63c751fca1f2de672f60a517",
    title: "Todolist one",
    description: "A list about the first todolist",
    valid: true,
    todolistId: "todolist_9b425417-86f6-4f4f-8c8c-ecf15d00574b",
    todos: [
      {
        title: "Todo one from todolist one",
        complete: true,
        _id: "63d6bd1ea1f2de672f614a12",
        createdAt: "2023-01-29T18:38:22.628Z",
        updatedAt: "2023-01-29T18:38:27.378Z",
        todoId: "todo_031e6038-7d34-4cbd-a773-774f12f21919",
      },
    ],
    createdAt: "2023-01-29T18:36:07.137Z",
    updatedAt: "2023-01-29T18:38:27.378Z",
    __v: 0,
  },
];

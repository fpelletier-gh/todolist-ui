import axios from "axios";
import {
  NotePayloadSchema,
  NoteSchema,
  TodolistPayloadSchema,
  TodolistSchema,
  TodoPayload,
  TodoSchema,
  UserSchema,
} from "../types";

const base = import.meta.env.VITE_API_ENDPOINT;

const userBase = `${base}/api/users`;
const sessionBase = `${base}/api/sessions`;
const todolistBase = `${base}/api/todolist`;
const noteBase = `${base}/api/note`;

const authToken = `Bearer ${localStorage.getItem("access_token")}`;
const refreshToken = localStorage.getItem("refresh_token");

axios.defaults.headers.common["Authorization"] = authToken;
axios.defaults.headers.common["x-refresh"] = refreshToken;

export async function registerUser(payload: {
  username: string;
  password: string;
  email: string;
  passwordConfirmation: string;
}) {
  return axios.post(userBase, payload).then((res) => res.data);
}

export async function login(payload: { email: string; password: string }) {
  return axios.post(sessionBase, payload).then((res) => {
    localStorage.setItem("access_token", res.data.accessToken);
    localStorage.setItem("refresh_token", res.data.refreshToken);
    axios.defaults.headers.common["Authorization"] = authToken;
    axios.defaults.headers.common["x-refresh"] = refreshToken;
    return res.data;
  });
}

export async function logout() {
  return axios.delete(sessionBase).then((res) => {
    return res.data;
  });
}

export async function getUser(): Promise<UserSchema> {
  return axios
    .get(userBase)
    .then((res) => {
      if (res.headers["x-access-token"]) {
        localStorage.setItem("access_token", res.headers["x-access-token"]);
      }
      return res.data;
    })
    .catch(() => {
      return null;
    });
}

export async function createTodo({
  todolistId,
  payload,
}: {
  todolistId: string;
  payload: { title: string };
}): Promise<TodoSchema> {
  return axios
    .post(`${todolistBase}/${todolistId}`, payload)
    .then((res) => res.data);
}

export async function createTodolist(payload: {
  title: string;
  description: string;
}): Promise<TodolistSchema> {
  return axios.post(todolistBase, payload).then((res) => res.data);
}

export async function updateTodolist({
  todolistId,
  payload,
}: {
  todolistId: string;
  payload: TodolistPayloadSchema;
}): Promise<TodolistSchema> {
  return axios.put(`${todolistBase}/${todolistId}`, payload);
}

export async function deleteTodolist(todolistId: string) {
  return axios.delete(`${todolistBase}/${todolistId}`).then((res) => res.data);
}

export async function updateTodo({
  todolistId,
  todoId,
  payload,
}: {
  todolistId: string;
  todoId: string;
  payload: Partial<TodoPayload>;
}): Promise<TodolistSchema> {
  return axios.put(`${todolistBase}/${todolistId}/${todoId}`, payload);
}

export async function deleteTodo({
  todolistId,
  todoId,
}: {
  todolistId: string;
  todoId: string;
}) {
  return axios
    .delete(`${todolistBase}/${todolistId}/${todoId}`)
    .then((res) => res.data);
}

export async function getTodolist(todolistId: string): Promise<TodolistSchema> {
  return axios.get(`${todolistBase}/${todolistId}`).then((res) => {
    return res.data;
  });
}

export async function getTodolists(): Promise<TodolistSchema[]> {
  return axios.get(todolistBase).then((res) => {
    return res.data;
  });
}

export async function getNote(noteId: string): Promise<NoteSchema> {
  return axios.get(`${noteBase}/${noteId}`).then((res) => {
    return res.data;
  });
}

export async function getNotes(): Promise<NoteSchema[]> {
  return axios.get(noteBase).then((res) => {
    return res.data;
  });
}

export async function createNote(payload: {
  title: string;
  content: string;
}): Promise<NoteSchema> {
  return axios.post(noteBase, payload).then((res) => res.data);
}

export function updateNote({
  noteId,
  payload,
}: {
  noteId: string;
  payload: NotePayloadSchema;
}) {
  return axios.put<TodolistSchema>(`${noteBase}/${noteId}`, payload);
}

export async function deleteNote(noteId: string) {
  return axios.delete(`${todolistBase}/${noteId}`).then((res) => res.data);
}

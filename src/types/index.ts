export interface UserSchema {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  session: string;
  iat: number;
  exp: number;
}

export interface TodoSchema {
  _id: string;
  todoId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  complete: boolean;
}

export interface LoginPayloadSchema {
  email: string;
  password: string;
}

export interface TodolistPayloadSchema {
  description: string;
  title: string;
  favorite?: boolean;
}

export interface TodolistSchema {
  _id: string;
  user: string;
  todolistId: string;
  createdAt: string;
  updatedAt: string;
  valid: boolean;
  __v: number;
  favorite: boolean;
  description: string;
  title: string;
  todos: TodoSchema[];
}

export interface User {
  _id: string;
  email: string;
  username: string;
}

export interface TodoPayload {
  title: string;
  complete: boolean;
}

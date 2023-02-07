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
export interface User {
  _id: string;
  email: string;
  username: string;
}

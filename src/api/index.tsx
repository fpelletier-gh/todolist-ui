import axios from "axios";

/* const base = process.env.API_ENDPOINT; */
const base = "http://127.0.0.1:1337";

const userBase = `${base}/api/users`;
const sessionBase = `${base}/api/sessions`;
const todolistBase = `${base}/api/todolist`;

export async function registerUser(payload: {
  username: string;
  password: string;
  email: string;
  passwordConfirmation: string;
}) {
  return axios.post(userBase, payload).then((res) => res.data);
}

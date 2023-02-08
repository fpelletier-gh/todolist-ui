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

export async function login(payload: { email: string; password: string }) {
  return axios.post(sessionBase, payload, {}).then((res) => {
    localStorage.setItem("access_token", res.data.accessToken);
    localStorage.setItem("refresh_token", res.data.refreshToken);
    return res.data;
  });
}

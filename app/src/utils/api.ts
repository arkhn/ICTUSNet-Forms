import { AUTH_API_URL } from "../constants";

const API_URL = `${process.env.REACT_APP_AUTH_API_URL}`;

export const login = async (
  username: string,
  password: string
): Promise<any> => {
  console.log(AUTH_API_URL);
  // const loginRequest = new Request(API_URL, {
  //   method: "POST",
  //   body: JSON.stringify({ username, password }),
  // });
  const loginData = await fetch(`http://localhost:8080/api/token/`, {
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  console.log(loginData);
};

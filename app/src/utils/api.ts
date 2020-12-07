import { AUTH_API_URL } from "../constants";

export const login = async (
  username: string,
  password: string
): Promise<{ refresh?: string; access?: string; detail?: string }> => {
  var data = new FormData();
  data.set("username", username);
  data.set("password", password);

  const loginData = await fetch(`${AUTH_API_URL}`, {
    method: "POST",
    body: data,
  });

  return await loginData.json();
};

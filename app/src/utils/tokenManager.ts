import {
  ACCES_TOKEN,
  REFRESH_TOKEN,
  AUTH_API_URL,
  USERNAME_KEY,
} from "../constants";

export const getTokens = () => ({
  access: localStorage.getItem(ACCES_TOKEN),
  refresh: localStorage.getItem(REFRESH_TOKEN),
  username: localStorage.getItem(USERNAME_KEY),
});

export const setTokens = ({
  access,
  refresh,
  username,
}: {
  access?: string;
  refresh?: string;
  username?: string;
}) => {
  access && localStorage.setItem(ACCES_TOKEN, access);
  refresh && localStorage.setItem(REFRESH_TOKEN, refresh);
  username && localStorage.setItem(USERNAME_KEY, username);
};

export const deleteTokens = () => {
  localStorage.removeItem(ACCES_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(USERNAME_KEY);
};

export const refreshToken = async (): Promise<boolean> => {
  const { refresh } = getTokens();

  if (refresh) {
    const data = new FormData();
    data.set("refresh", refresh);

    const accessTokenRequest = new Request(`${AUTH_API_URL}refresh/`, {
      method: "POST",
      body: data,
    });
    const refreshResponse = await fetch(accessTokenRequest);

    if (refreshResponse.status === 200) {
      const { access } = await refreshResponse.json();
      setTokens({ access });
      return true;
    }
  }

  return false;
};

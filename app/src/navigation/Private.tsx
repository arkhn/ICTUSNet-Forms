import React, { useEffect } from "react";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import { getTokens } from "utils/tokenManager";
import { useAppSelector, useAppDispatch } from "state/store";
import { login } from "state/user";

type Props = React.ComponentProps<typeof Route>;

const PrivateRoute: React.FC<Props> = (props) => {
  const { access, refresh, username } = getTokens();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state);

  useEffect(() => {
    if (!user && access && refresh && username) {
      dispatch(login({ access, refresh, username }));
    }
  }, [user, dispatch, access, refresh, username]);

  if (!access || !refresh || !username) {
    return (
      <Route
        render={({ location }) => (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )}
      />
    );
  }

  return <Route {...props} />;
};

export default PrivateRoute;

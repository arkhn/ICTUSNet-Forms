import React, { useEffect } from "react";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useQuery } from '@apollo/react-hooks'
// import { gql } from 'apollo-boost'

import { ACCES_TOKEN } from "../constants";
// import { login } from "state/user";

import { useAppSelector } from "state/store";

// const ME = gql`
//   query me {
//     me {
//       id
//       name
//       email
//     }
//   }
// `;

type Props = React.ComponentProps<typeof Route>;

const PrivateRoute: React.FC<Props> = (props) => {
  const { user } = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const authToken = localStorage.getItem(ACCES_TOKEN);

  //Simulate login checkup
  const { data, loading, error } = {
    data: { user: { id: "123456" } },
    loading: false,
    error: null,
  };
  // useQuery(ME, {
  //   context: {
  //     headers: {
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //   },
  //   skip: !authToken || null !== me,
  // });

  // useEffect(() => {
  //   if (!user && data && data.user) {
  //     dispatch(login(user));
  //   }
  // }, [user, data, dispatch]);

  if (loading) return <span>Loading</span>;

  if (
    (!user && !authToken) ||
    error ||
    (authToken && !loading && data && !data.user)
  ) {
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

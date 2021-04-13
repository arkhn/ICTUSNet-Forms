import React from "react";
import { NavBar } from "@arkhn/ui";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../assets/img/arkhn-logo.svg";
import { Typography, IconButton, makeStyles } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import LanguageSelect from "./LanguageSelect";
import { useAppSelector, useAppDispatch } from "state/store";
import { logout } from "state/user";

const useStyles = makeStyles(() => ({
  logo: {
    height: 27,
    width: 21,
    marginRight: 16,
  },
  link: {
    display: "flex",
    textDecoration: "none",
    width: "fit-content",
  },
  titleContainer: {
    flexGrow: 1,
  },
}));

const NavigationBar: React.FC<{}> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state);

  return (
    <NavBar
      title={
        <>
          <div className={classes.titleContainer}>
            <Link className={classes.link} to={"/avc_viewer"}>
              <Logo className={classes.logo} />
              <Typography variant="h6" color="primary">
                ICTUSNet
              </Typography>
            </Link>
          </div>
          {user && user.access && (
            <IconButton onClick={() => dispatch(logout())}>
              <ExitToApp htmlColor="#F2574B" />
            </IconButton>
          )}
          <LanguageSelect />
        </>
      }
    />
  );
};

export default NavigationBar;

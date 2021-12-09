import React from "react";

import { NavBar } from "@arkhn/ui";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../assets/img/arkhn-logo.svg";
import { IconButton, makeStyles } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import LanguageSelect from "./LanguageSelect";
import { useAppSelector, useAppDispatch } from "state/store";
import { logout } from "state/user";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxHeight: 27,
    width: "auto",
    height: "auto",
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
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
              <div className={classes.logoContainer}>
                <Logo className={classes.logo} />
                <img
                  className={classes.logo}
                  src="ictus-logo-small.png"
                  alt="ICTUSNet Logo"
                />
              </div>
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

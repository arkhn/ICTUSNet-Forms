import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import { NavBar } from "@arkhn/ui";
import { makeStyles, Theme, createStyles, Typography } from "@material-ui/core";

import LanguageSelect from "../components/LanguageSelect";
import { ReactComponent as Logo } from "../assets/img/arkhn-logo.svg";
import AVCTableViewer from "../screens/AVCTableViewer";
import PatientForm from "../screens/PatientForm";
import PrivateRoute from "./Private";
import Login from "screens/Login";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      paddingTop: theme.spacing(8),
      marginTop: theme.spacing(4),
    },
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
  })
);

const AppNavigator: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <>
      <BrowserRouter>
        <NavBar
          title={
            <>
              <div className={classes.titleContainer}>
                <Link className={classes.link} to={"/avc_viewer"}>
                  <Logo className={classes.logo} />
                  <Typography variant="h6" color="primary">
                    AVC Forms
                  </Typography>
                </Link>
              </div>
              <LanguageSelect />
            </>
          }
        />
        <div className={classes.body}>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <PrivateRoute path="/avc_viewer">
              <AVCTableViewer />
            </PrivateRoute>
            <PrivateRoute path="/patient_form">
              <PatientForm />
            </PrivateRoute>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default AppNavigator;

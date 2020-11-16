import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import { NavBar } from "@arkhn/ui";
import { makeStyles, Theme, createStyles, Typography } from "@material-ui/core";

import LanguageSelect from "../components/LanguageSelect";
import { ReactComponent as Logo } from "../assets/img/arkhn-logo.svg";
import AVCTableViewer from "../screens/AVCTableViewer";
import PatientForm from "../screens/PatientForm";

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
                <Link className={classes.link} to={"/"}>
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
          <Route exact path="/">
            <AVCTableViewer />
          </Route>
          <Route exact path="/avc_viewer">
            <AVCTableViewer />
          </Route>
          <Route exact path="/patient_form">
            <PatientForm />
          </Route>
        </div>
      </BrowserRouter>
    </>
  );
};

export default AppNavigator;

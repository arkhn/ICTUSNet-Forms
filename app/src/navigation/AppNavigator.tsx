import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { makeStyles, Theme, createStyles } from "@material-ui/core";
import AVCTableViewer from "../screens/AVCTableViewer";
import PatientForm from "../screens/PatientForm";
import PrivateRoute from "./Private";
import Login from "screens/Login";
import NavigationBar from "components/NavigationBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      paddingTop: theme.spacing(8),
      marginTop: theme.spacing(4),
    },
  })
);

const AppNavigator: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
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

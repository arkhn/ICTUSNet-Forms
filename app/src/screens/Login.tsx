import React, { useEffect } from "react";
import { FormBuilder } from "@arkhn/ui";
import { FormInputProperty } from "@arkhn/ui/lib/Form/InputTypes";
import {
  Button,
  CircularProgress,
  Container,
  makeStyles,
} from "@material-ui/core";
import { loginThunk } from "state/user";
import { useAppDispatch, useAppSelector } from "state/store";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: "100%",
    width: "auto",
    height: "auto",
    marginRight: 16,
  },
}));

type LoginData = {
  username: string;
  password: string;
};

const Login: React.FC<{}> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { user } = useAppSelector((state) => state);
  const { t } = useTranslation();
  const properties: FormInputProperty<LoginData>[] = [
    {
      type: "text",
      name: "username",
      label: t("username"),
      validationRules: { required: t("requiredField") as string },
    },
    {
      type: "text",
      name: "password",
      password: true,
      label: t("password"),
      validationRules: { required: t("requiredField") as string },
    },
  ];

  useEffect(() => {
    if (user && user.access) {
      history.push("/avc_viewer");
    }
  }, [user, history]);

  const onSubmit = (data: LoginData) => {
    dispatch(loginThunk(data));
  };

  return (
    <Container maxWidth="sm">
      <FormBuilder<LoginData>
        properties={properties}
        formId="login-form"
        submit={onSubmit}
      />
      <Button type="submit" form="login-form" fullWidth>
        {user?.loading ? <CircularProgress /> : t("login")}
      </Button>
      <img className={classes.logo} src="ictus-logo.png" alt="ICTUSNet Logo" />
    </Container>
  );
};

export default Login;

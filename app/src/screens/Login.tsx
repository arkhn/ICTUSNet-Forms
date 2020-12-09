import React, { useEffect } from "react";
import { FormBuilder } from "@arkhn/ui";
import { FormInputProperty } from "@arkhn/ui/lib/Form/InputTypes";
import { Button, CircularProgress, Container } from "@material-ui/core";
import { loginThunk } from "state/user";
import { useAppDispatch, useAppSelector } from "state/store";
import { useHistory } from "react-router-dom";

type LoginData = {
  username: string;
  password: string;
};

const Login: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { user } = useAppSelector((state) => state);
  const properties: FormInputProperty<LoginData>[] = [
    {
      type: "text",
      name: "username",
      label: "Login",
      validationRules: { required: "Field required" },
    },
    {
      type: "text",
      name: "password",
      password: true,
      label: "Password",
      validationRules: { required: "Field required" },
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
        {user?.loading ? <CircularProgress /> : "Login"}
      </Button>
    </Container>
  );
};

export default Login;

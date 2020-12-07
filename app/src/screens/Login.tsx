import React, { useEffect } from "react";
import { FormBuilder } from "@arkhn/ui";
import { FormInputProperty } from "@arkhn/ui/lib/Form/InputTypes";
import { Button, CircularProgress } from "@material-ui/core";
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
      // validationRules: { required: "Field required" },
    },
  ];

  useEffect(() => {
    if (user?.access) {
      history.push("/avc_viewer");
    }
  }, [user, history]);

  return (
    <>
      <FormBuilder<LoginData>
        properties={properties}
        formId="login-form"
        defaultValues={{ username: "toto", password: "" }}
        submit={(data) =>
          dispatch(
            loginThunk({ username: data.username, password: data.password })
          )
        }
      />
      <Button type="submit" form="login-form">
        {user?.loading ? <CircularProgress /> : "Submit"}
      </Button>
    </>
  );
};

export default Login;

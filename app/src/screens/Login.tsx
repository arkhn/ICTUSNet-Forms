import React from "react";
import { FormBuilder } from "@arkhn/ui";
import { FormInputProperty } from "@arkhn/ui/lib/Form/InputTypes";
import { Button } from "@material-ui/core";
import { login } from "utils/api";

type LoginData = {
  username: string;
  password: string;
};

const Login: React.FC<{}> = () => {
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
  return (
    <>
      <FormBuilder<LoginData>
        properties={properties}
        formId="login-form"
        defaultValues={{ username: "toto", password: "" }}
        submit={(data) => login(data.username, data.password)}
      />
      <Button type="submit" form="login-form">
        Submit
      </Button>
    </>
  );
};

export default Login;

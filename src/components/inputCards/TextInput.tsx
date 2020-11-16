import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  TextFieldProps,
  FormControl,
} from "@material-ui/core";
import { PatientData } from "state/patientFormSlice";

type TextInputProps = {
  title?: string;
  inputRef?: (ref: any) => void;
  name?: keyof PatientData;
  error?: boolean;
  helperText?: string;
  type?: "text" | "number";
} & TextFieldProps;

const TextInput = ({ title, ...textFieldProps }: TextInputProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <FormControl style={{ minWidth: 120, maxWidth: 600 }}>
          <TextField {...textFieldProps} />
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default TextInput;

import React from "react";
import {
  TextField,
  MenuItem,
  Card,
  CardContent,
  Typography,
  TextFieldProps,
  FormControl,
} from "@material-ui/core";
import { PatientData } from "state/patientFormSlice";
import { useTranslation } from "react-i18next";

type SelectInputProps = TextFieldProps & {
  title?: string;
  inputRef?: (ref: any) => void;
  name?: keyof PatientData;
  error?: boolean;
  helperText?: string;
  options: { id: string; label: string }[];
};

const SelectInput: React.FC<SelectInputProps> = ({
  title,
  options,
  name,
  ...selectInputProps
}) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <FormControl style={{ minWidth: 120, maxWidth: 600 }}>
          <TextField select name={name} {...selectInputProps} fullWidth>
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {t(option.label)}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default SelectInput;

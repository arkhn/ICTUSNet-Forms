import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Switch,
  Grid,
  FormControl,
} from "@material-ui/core";
import { PatientData } from "state/patientFormSlice";

type SwitchInputProps = {
  title?: string;
  inputRef?: (ref: any) => void;
  name?: keyof PatientData;
  error?: boolean;
  helperText?: string;
  trueLabel?: string;
  falseLabel?: string;
  checked?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
};

const SwitchInput: React.FC<SwitchInputProps> = ({
  title,
  falseLabel,
  trueLabel,
  ...inputProps
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <FormControl style={{ minWidth: 120, maxWidth: 600 }}>
          <Grid
            component="label"
            container
            alignItems="center"
            spacing={1}
            direction="row"
          >
            <Grid item>
              <Typography>{falseLabel}</Typography>
            </Grid>
            <Grid item>
              <Switch {...inputProps} />
            </Grid>
            <Grid item>
              <Typography>{trueLabel}</Typography>
            </Grid>
          </Grid>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default SwitchInput;
